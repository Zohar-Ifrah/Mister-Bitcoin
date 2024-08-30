import { Component, inject, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { ContactService } from '../../services/async-contact.service';
// import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent implements OnInit {

  private contactService = inject(ContactService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  contact$: Observable<Contact> = this.route.data.pipe(
    map(data => data['contact'])
  )

  ngOnInit(): void {
    // this.contact$ = this.route.data.pipe()
    // this.contact$ = this.route.params.pipe(
    //   switchMap(params => this.contactService.getContactById(params["id"]))
    // )
  }

  onBack() {
    this.router.navigateByUrl("/contact")
  }

  getRoboHashUrl(id: string) {
    return `https://robohash.org/${id}.png?size=300x300`
  }
}
