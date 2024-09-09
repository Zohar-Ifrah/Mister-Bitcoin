import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { BitcoinService } from '../../services/bitcoin.service';
import { filter, map, Observable, switchMap, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Move } from '../../models/move.model';
import { ContactService } from '../../services/async-contact.service';
import { MsgService } from '../../services/msg.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  private userService = inject(UserService)
  private contactService = inject(ContactService)
  private bitcoinService = inject(BitcoinService)
  private msgService = inject(MsgService)
  destroyRef = inject(DestroyRef)
  contact = 123
  user$: Observable<User> = this.userService.loggedInUser$

  userMoves$: Observable<Move[]> = this.user$.pipe(
    filter(user => !!user),
    map(user => user.moves.slice(0, 3)),
    takeUntilDestroyed(this.destroyRef)
  )

  BTC$: Observable<string> = this.user$.pipe(
    filter(user => !!user),
    switchMap(user => this.bitcoinService.getRate(user.coins)),
    takeUntilDestroyed(this.destroyRef),
  )

  onAddMoveDemo() {
    let contactName = ''
    let amountSent = 0
    this.contactService.contacts$.pipe(
      take(1),
      map(contacts => {
        if (contacts.length === 0) {
          this.msgService.setErrorMsg('No contacts available')
          return null
        }
        const randomIndex = Math.floor(Math.random() * contacts.length)
        return contacts[randomIndex]
      }),
      switchMap(contact => {
        if (!contact) {
          return []
        }
        const amount = Math.ceil(Math.random() * 10)
        contactName = contact.name
        amountSent = amount
        return this.userService.addMove(contact, amount)
      })
    ).subscribe({
      next: (user) => {
        if (!user) return
        console.log('Move added successfully', user)
        this.msgService.setSuccessMsg(`${amountSent} coins added successfully to ${contactName}`)
      },
      error: (err) => {
        this.msgService.setErrorMsg('Not enough coins!')
        console.error('Error adding move:', err)
      }
    })
  }
  

  onAddCoinsDemo(user: User) {
    const userToEdit = { ...user }

    if (userToEdit.coins < 500) {
      userToEdit.coins += 100
    }
    else {
      this.msgService.setErrorMsg('Reached the limit: over 500 coins')
      return
    }
    this.userService.updateUser(userToEdit).subscribe({
      next: (updatedUser) => {
        this.msgService.setSuccessMsg('+100 coins added successfully!')
        console.log('Coins added successfully', updatedUser)
      },
      error: (err) => {
        this.msgService.setErrorMsg('Failed to add coins')
        console.error('Error updating user:', err)
      }
    });
  }

}
