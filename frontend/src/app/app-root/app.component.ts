import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  private contactService = inject(ContactService)
  subscripction!: Subscription

  ngOnInit(): void {
    this.subscripction = this.contactService.loadContacts()
      .subscribe({
        error: err => console.log("err", err)
      })
  }

  ngOnDestroy(): void {
    this.subscripction.unsubscribe()
  }

  // onRemove(id: string) {
  //   console.log(id)
  // }

  // getMarketPrice() {
  //   console.log("Pls Edit me!")
  // }

  // getConfirmedTransactions() {
  //   console.log("Pls Edit me!")
  // }
}
