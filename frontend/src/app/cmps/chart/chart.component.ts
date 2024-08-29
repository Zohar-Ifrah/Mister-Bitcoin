import { Component, HostListener, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { BitcoinService } from '../../services/bitcoin.service';

interface Trade {
  name: string
  value: number
}

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  width: number = 1000
  height: number = 400

  trades$!: Observable<Trade>
  subscription!: Subscription

  constructor(private bitcoinService: BitcoinService) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth * 0.9
    this.height = event.target.innerHeight * 0.5
  }

  ngOnInit() {
    this.onResize({ target: window })
    this.trades$ = this.bitcoinService.getTradeVolume()
  }
}