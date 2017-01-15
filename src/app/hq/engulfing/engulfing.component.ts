import { Component, Input, OnInit, OnChanges, DoCheck } from '@angular/core';

import { Hq, HqTicker } from '../../models/hq.model';
import { HqStatBack2Back } from '../../models/stat.model';
// import { HqDataService } from '../../shared/hq.service';
import { HqStatService } from '../../shared/hq-stat.service';

import { CandleStick } from '../../shared/candlestick.class';
// import { B2bComponent } from '../b2b/b2b.component';

@Component({
  selector: 'app-ticker-list',
  templateUrl: './engulfing.component.html',
  styleUrls: ['./engulfing.component.css']
})
export class EngulfingComponent implements OnInit, OnChanges, DoCheck {
  @Input('hq-tickers') hqTickers: HqTicker[];
  // hqTickers: HqTicker[] = new Array<HqTicker>();
  dayIndex: number = 0;
  days: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12];

  constructor(
    // private hqDataService: HqDataService,
    private hqStatService: HqStatService
  ) { }

  ngOnInit() {
  }
  ngOnChanges() {
    // this.getHqTickers();
    // this.findEngulfing();
  }
  ngDoCheck() {
    // this.getHqTickers();
  }
  // getHqTickers() {
  //   if (this.tickers != null) {
  //     this.tickers.forEach((ticker: string) => {
  //       this.hqDataService.getHqTicker(ticker)
  //         .then(hqTicker => this.hqTickers.push(hqTicker));
  //     });
  //   }
  // }
  onDayChange() {
    // console.log('day change' + this.dayIndex);
    // debugger;
    this.dayIndex = parseInt(''+this.dayIndex);
  }
  oneStick(hqTicker: HqTicker): string {
    return new CandleStick(hqTicker, this.dayIndex).oneStick();
  }
  twoSticks(hqTicker: HqTicker): string {
    return new CandleStick(hqTicker, this.dayIndex).twoSticks();
  }
}
