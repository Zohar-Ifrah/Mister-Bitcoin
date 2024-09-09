import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ContactService } from '../../services/async-contact.service';
// import { ContactService } from '../../services/contact.service';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Contact } from '../../models/contact.model';
import { finalize, forkJoin, Observable, of } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
import { MsgService } from '../../services/msg.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent {

  private contactService = inject(ContactService)
  private userService = inject(UserService)
  private loaderService = inject(LoaderService)
  private msgService = inject(MsgService)
  // private destroyRef = inject(DestroyRef)

  contacts$: Observable<Contact[]> = this.contactService.contacts$

  onRemoveContact(contactId: string) {
    this.loaderService.setIsLoading(true)

    this.contactService.deleteContact(contactId)
      .pipe(
        finalize(() => this.loaderService.setIsLoading(false))
      )
      .subscribe({
        next: () => {
          this.msgService.setSuccessMsg('Contact removed successfully')
          this._updateUsersAfterContactRemoval(contactId)
        },
        error: err => {
          console.log('Error:', err)
          this.msgService.setErrorMsg('Failed to delete contact')
        }
      })
  }

  private _updateUsersAfterContactRemoval(contactId: string) {
    this.userService.getUsers().pipe(
      finalize(() => this.loaderService.setIsLoading(false))
    ).subscribe(users => {
      // Create an array of observables for updating users
      const updateObservables = users.map(user => {
        const updatedMoves = user.moves.filter(move => move.toId !== contactId)

        // If there are changes, update the user
        if (updatedMoves.length !== user.moves.length) {
          return this.userService.updateUser({
            ...user,
            moves: updatedMoves
          })
        }

        return of(null)        // If no changes, return an observable that completes immediately
      }).filter(obs => obs !== of(null)) // Filter out null observables

      forkJoin(updateObservables).subscribe({  // forkJoin to wait for all updates to complete
        next: () => {
          console.log('Users were updated accordingly')
        },
        error: err => {
          console.log('Error updating users:', err)
        }
      })
    })
  }
}
