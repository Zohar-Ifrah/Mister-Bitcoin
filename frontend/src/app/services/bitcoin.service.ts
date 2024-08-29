import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { storageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  TRADE_VOLUME_KEY = 'tradeVolume'

  constructor(private http: HttpClient) { }

  getRate(coins: number) {
    //temp hard-coded
    const rate = coins * 0.0000156532
    return of(rate).pipe(
      map(value => value.toString())
    )
    // return this.http.get<string>(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
  }

  getTradeVolume() {
    const data = storageService.load(this.TRADE_VOLUME_KEY)
    // console.log('data service', data);

    if (data) return of(data)
    return this.http.get<{ values: [{ x: number, y: number }] }>(`https://api.blockchain.info/charts/trade-volume?timespan=1months&format=json&cors=true`)
      .pipe(map(res => {
        //prepare the data in a way that the chart can render
        const vals = res.values.map(item => { return { name: new Date(item.x * 1000).toLocaleDateString("en-US"), value: item.y } })
        storageService.store(this.TRADE_VOLUME_KEY, vals)
        return vals
      }))
  }
}
