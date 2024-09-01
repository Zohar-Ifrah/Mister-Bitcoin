import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { BitcoinService } from '../../services/bitcoin.service';
import { filter, map, Observable, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Move } from '../../models/move.model';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  destroyRef = inject(DestroyRef)
  private userService = inject(UserService)
  private bitcoinService = inject(BitcoinService)

  user$: Observable<User | null> = this.userService.loggedInUser$
  userMoves$: Observable<Move[]> = this.user$.pipe(
    filter(user => !!user),
    map(user => user.moves.slice(0, 3)),
    takeUntilDestroyed(this.destroyRef)
  )

  BTC$: Observable<string> = this.user$.pipe(
    filter(user => !!user),
    switchMap(user => this.bitcoinService.getRate(user.coins)),
    // switchMap(user => this.bitcoinService.getRateStream(user.coins)),
    takeUntilDestroyed(this.destroyRef),
  )

  // onAddMoveDemo() {
  //   const contact = {
  //     "_id": "5a566402abb3146207bc4ec5",
  //     "name": "Floyd Rutledge",
  //     "email": "floydrutledge@renovize.com",
  //     "phone": "+1 (807) 597-3629"
  //   }

  //   const amount = Math.ceil(Math.random() * 10)
  //   this.userService.addMove(contact, amount)
  //     .subscribe({
  //       error: (err) => console.log(err)
  //     })
  // }

}
