import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ContactService } from '../services/async-contact.service';
import { Contact } from '../models/contact.model';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs';

export const contactResolver: ResolveFn<Contact> = (route, state) => {
  const id = route.params['id']
  console.log("reslover id >>", id);
  
  const contactService = inject(ContactService)
  const loaderService = inject(LoaderService)
  loaderService.setIsLoading(true)
  return contactService.getContactById(id).pipe(
    finalize(() => {loaderService.setIsLoading(false)})
  )

}
