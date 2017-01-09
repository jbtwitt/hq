import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';
import { Hq } from '../models/hq.model';
import { HqStat } from '../models/stat.model';
import { HqDataService } from '../shared/hq.service';
import { HqStatService } from '../shared/hq-stat.service';
import { HqUtils } from '../shared/hq-utils';

@Component({
  selector: 'app-hq-stat',
  templateUrl: './hq-stat.component.html',
  styleUrls: ['./hq-stat.component.css']
})
export class HqStatComponent implements OnInit {
  tickers: string[];
  hqStats: HqStat[] = new Array<HqStat>();

  constructor(
    private hqDataService: HqDataService,
    private hqStatService: HqStatService
  ) { }

  ngOnInit() {
    this.hqDataService.getData(environment.jsonData.tickers)
      .subscribe(data => {
        this.tickers = data;
        for(let i=0; i<this.tickers.length; i++) {
          this.hqStatLoadTicker(this.tickers[i]);
        }
      });
  }
  hqStatLoadTicker(ticker: string): void {
    this.hqDataService.getCsv(ticker) // get HQ csv
      .subscribe(csv => {
          let hqs = HqUtils.parseHqCsv(csv);
          let hqStat = this.hqStatService.statHq(ticker, hqs);
          this.hqStats.push(hqStat);
        }
      );
  }
}
