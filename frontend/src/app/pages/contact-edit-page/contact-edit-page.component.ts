import { Component, DestroyRef, inject, OnInit } from '@angular/core'
import { ContactService } from '../../services/contact.service'
import { Contact } from '../../models/contact.model'
import { filter, Observable, switchMap } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { nameTaken, nonEnglishLetters } from '../../customValidators/contact.validators'

@Component({
  selector: 'contact-edit-page',
  templateUrl: './contact-edit-page.component.html',
  styleUrl: './contact-edit-page.component.scss'
})
export class ContactEditPageComponent implements OnInit {
  private destroyRef = inject(DestroyRef)
  private contactService = inject(ContactService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private fb = inject(FormBuilder)
  // this.contact = this.contactService.getEmptyContact() as Contact }
  form!: FormGroup
  contact: Contact | null = null

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required, nonEnglishLetters], [nameTaken]], // initial value, validators, async validators
      phone: ['', [Validators.required], []],
      email: ['', [Validators.required], []]
    })
  }

  ngOnInit(): void {
    //with resolver
    this.route.data
      .pipe(
        filter(data => data['contact']),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(({ contact }) => {
        this.contact = contact
        this.form.patchValue(contact)
      })
  }

  async onSaveContact() {
    const contactToSave = { ...this.contact ,...this.form.value } as Contact
    this.contactService.saveContact(contactToSave)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.router.navigateByUrl('/contact'),
        error: err => console.log('err:', err)
      })
  }

  onBack(ev: Event) {
    ev.preventDefault()
    this.router.navigateByUrl('/contact')
  }
}
