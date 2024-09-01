import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, filter, map, Observable, Subscription, take } from 'rxjs';
import { UserService } from '../../services/user.service';
import { MsgService } from '../../services/msg.service';


@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent implements OnInit, OnDestroy {

  private msgService = inject(MsgService)
  private userService = inject(UserService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  subscription!: Subscription
  contact: Contact | null = null

  contact$: Observable<Contact> = this.route.data.pipe(
    map(data => data['contact'])
  )
  user$ = this.userService.loggedInUser$

  contactMoves$ = combineLatest([this.user$, this.contact$]).pipe(
    filter(([user]) => !!user),
    map(([user, contact]) => user?.moves.filter(move => move.toId === contact._id)),
  )

  ngOnInit(): void {
    this.subscription = this.contact$.subscribe(contact => this.contact = contact)
  }

  // onTransferCoins(amount: number) {
  //   this.userService.addMove(this.contact, amount)
  //     .pipe(take(1))
  //     .subscribe({
  //       next: () => {
  //         this.msgService.setSuccessMsg(`Transferred ${amount} coins to ${this.contact?.name}`);
  //       },
  //       error: (err) => console.log(err)
  //     });
  // }


  onBack() {
    this.router.navigateByUrl("/contact")
  }

  getRoboHashUrl(id: string) {
    return `https://robohash.org/${id}.png?size=300x300`
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
