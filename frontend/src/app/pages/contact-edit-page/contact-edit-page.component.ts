import { Component, DestroyRef, inject, OnInit } from '@angular/core'
import { ContactService } from '../../services/async-contact.service'
// import { ContactService } from '../../services/contact.service'
import { Contact } from '../../models/contact.model'
import { map, switchMap, take } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { emailTaken, nameTaken, nonEnglishLetters } from '../../customValidators/contact.validators'

@Component({
  selector: 'contact-edit-page',
  templateUrl: './contact-edit-page.component.html',
  styleUrl: './contact-edit-page.component.scss'
})
export class ContactEditPageComponent implements OnInit {
  // private destroyRef = inject(DestroyRef)
  private contactService = inject(ContactService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private fb = inject(FormBuilder)
  // this.contact = this.contactService.getEmptyContact() as Contact }
  form!: FormGroup
  contact: Contact | null = null
  isEditMode: boolean = false

  // constructor() {
  //   this.form = this.fb.group({
  //     name: ['', [Validators.required, nonEnglishLetters], []], // initial value, validators, async validators
  //     phone: ['', [Validators.required], []],
  //     email: ['', [Validators.required], [emailTaken(this.contactService)]]
  //   })
  // }

  ngOnInit(): void {
    this.route.data.subscribe(({ contact }) => {
      this.contact = contact
      this.isEditMode = !!contact
      this.initForm()
    })
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, nonEnglishLetters], [nameTaken]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required], this.isEditMode ? [] : [emailTaken(this.contactService)]]
    })

    if (this.isEditMode && this.contact) {
      this.form.patchValue(this.contact)
    }
  }

  async onSaveContact() {
    this.contactService.contacts$
      .pipe(
        take(1),
        map(contacts => {
          let newImgID: string
  
          if (this.contact?.imgID) { 
            newImgID = this.contact.imgID // for edit contact
          } else {

            let lastImgID = 0
  
            if (contacts.length > 0) {
              lastImgID = Math.max(...contacts.map(c => parseInt(c.imgID, 10)))
            }
  
            if (lastImgID >= 78) {
              newImgID = '1' // Reset to 1 if the last imgID is 78 (no more api pics over 78)
            } else {
              newImgID = (lastImgID + 1).toString()
            }
          }
  
          return newImgID
        }),
        switchMap(newImgID => {
          const contactToSave = { ...this.contact, ...this.form.value, imgID: newImgID } as Contact
          return this.contactService.saveContact(contactToSave)
        })
      )
      .subscribe({
        next: () => this.router.navigateByUrl('/contact'),
        error: err => console.log('err:', err)
      })
  }
  
  
  onBack() {
    this.router.navigateByUrl('/contact')
  }
}
