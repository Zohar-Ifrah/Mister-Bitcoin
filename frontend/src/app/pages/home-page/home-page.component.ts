import { Component, DestroyRef, inject } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { BitcoinService } from '../../services/bitcoin.service';
import { filter, map, Observable, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Move } from '../../models/move.model';
// import { ContactService } from '../../services/async-contact.service';
import { MsgService } from '../../services/msg.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  private userService = inject(UserService)
  // private contactService = inject(ContactService)
  private bitcoinService = inject(BitcoinService)
  private msgService = inject(MsgService)
  destroyRef = inject(DestroyRef)

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
    const contact = {
      "_id": "66cf81e23b606ea16c615938",
      "name": "Floyd Rutledge",
      "email": "floydrutledge@renovize.com",
      "phone": "+1 (807) 597-3629"
    }
    const amount = Math.ceil(Math.random() * 10);
    this.userService.addMove(contact, amount).subscribe({
      next: (user) => {
        this.msgService.setSuccessMsg(`${amount} coins added successfully to ${contact.name}`)
        console.log('Move added successfully', user);
      },
      error: (err) => {
        this.msgService.setErrorMsg('Not enough coins!')
        console.error('Error adding move:', err);
      }
    });
  }
}
// onAddMoveDemo() {
//   const contact = {
//     "_id": "66cf81e23b606ea16c615938",
//     "name": "Floyd Rutledge",
//     "email": "floydrutledge@renovize.com",
//     "phone": "+1 (807) 597-3629"
//   }

//   const amount = Math.ceil(Math.random() * 10)
//   // console.log(this.userService.addMove(contact, amount));

//   this.userService.addMove(contact, amount)
//     .subscribe({
//       error: (err) => console.log(err)
//     })
// }
