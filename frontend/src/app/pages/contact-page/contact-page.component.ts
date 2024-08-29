import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Contact } from '../../models/contact.model';
import { delay, Observable } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent {

  private contactService = inject(ContactService)
  private loaderService = inject(LoaderService)
  private destroyRef = inject(DestroyRef)

  contacts$: Observable<Contact[]> = this.contactService.contacts$

  onRemoveContact(contactId: string) {
    this.loaderService.setIsLoading(true)
    this.contactService.deleteContact(contactId)
    .subscribe({
      error: err => console.log('err:', err),
      complete: () => this.loaderService.setIsLoading(false)
    })
  }
}
