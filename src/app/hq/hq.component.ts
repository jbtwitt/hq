import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Hq, HqTicker } from '../models/hq.model';
import { HqStat } from '../models/stat.model';
import { HqUtils } from '../shared/hq-utils';
import { HqDataService } from '../shared/hq.service';
import { HqStatService } from '../shared/hq-stat.service';

@Component({
  selector: 'app-hq',
  templateUrl: './hq.component.html',
  styleUrls: ['./hq.component.css']
})
export class HqComponent implements OnInit {
  tickers: string[];
  hqTickers: HqTicker[] = new Array<HqTicker>();
  hqLen: number = environment.hqParseLength;
  today: any[];
  hqTicker: HqTicker;
  inverseFlag: boolean = false;

  constructor(
    private hqDataService: HqDataService,
    private hqStatService: HqStatService
  ) { }

  ngOnInit(): void {
    // this.getTickers(environment.jsonData.tickers);
    this.getHqTickers();
    this.today = new Date().toLocaleString().split(',')[0].split('/');
  }
  getTickers(jsonFile: string): void {
    this.hqDataService.getData(jsonFile)
      .subscribe(data => this.tickers = data);
  }

  btnTickerHq(hqTicker: HqTicker): void {
    this.hqTicker = hqTicker;
    // this.hqDataService.getCsv(hqTicker.ticker) // get HQ csv
    //   .subscribe(csv => {
    //       this.csv = csv;
    //       this.hqs = HqUtils.parseHqCsv(csv);
    //     }
    //   );
  }

  btnInverse() {
    this.inverseFlag = !this.inverseFlag;
    if (this.inverseFlag) {
      this.getInverseTickers();
    } else {
      this.getHqTickers();
    }
  }
  getHqTickers(): void {
    this.hqDataService.getHqTickers(environment.jsonData.tickers)
      .then((hqTickers) => this.hqTickers = hqTickers);
  }
  getInverseTickers(): void {
    // this.hqDataService.getData(environment.jsonData.inverseTickers)
    //   .subscribe(data => this.tickers = data);
    this.hqDataService.getHqTickers(environment.jsonData.inverseTickers)
      .then((hqTickers) => this.hqTickers = hqTickers);
  }
}
