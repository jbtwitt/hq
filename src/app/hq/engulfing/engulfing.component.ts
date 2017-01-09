import { Component, Input, OnInit, OnChanges, DoCheck } from '@angular/core';

import { Hq, HqTicker } from '../../models/hq.model';
import { HqDataService } from '../../shared/hq.service';
import { HqStatService } from '../../shared/hq-stat.service';

@Component({
  selector: 'app-engulfing',
  templateUrl: './engulfing.component.html',
  styleUrls: ['./engulfing.component.css']
})
export class EngulfingComponent implements OnInit, OnChanges, DoCheck {
  @Input('hq-tickers') hqTickers: HqTicker[];
  // hqTickers: HqTicker[] = new Array<HqTicker>();
  engulfingTickers: HqTicker[] = new Array<HqTicker>();
  dayIndex: number = 0;
  days: number[] = [0,1,2,3,4,5];

  constructor(
    private hqDataService: HqDataService,
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
    this.findEngulfing();
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
    this.findEngulfing();
  }
  findEngulfing() {
    if (this.hqTickers != null) {
      this.engulfingTickers = new Array<HqTicker>();
      this.hqTickers.forEach((hqTicker: HqTicker) => {
        if (this.hqStatService.isEngulfing(hqTicker, this.dayIndex)) {
          this.engulfingTickers.push(hqTicker);
        }
      });
    }
  }
}
