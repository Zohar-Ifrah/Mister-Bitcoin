import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { BitcoinService } from '../../services/bitcoin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  user!: User
  BTC$!: Observable<string>

  private userService = inject(UserService)
  private bitcoinService = inject(BitcoinService)

  ngOnInit(): void {
    this.user = this.userService.getUser()
    this.BTC$ = this.bitcoinService.getRate(this.user.coins)
  }

}
