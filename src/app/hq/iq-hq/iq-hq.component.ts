import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Iq, IqTicker } from '../../models/iq.model';
import { Hq, HqTicker, IqHqTicker } from '../../models/hq.model';
import { HqDataService } from '../../shared/hq.service';
import { HqUtils } from '../../shared/hq-utils';

@Component({
  selector: 'app-iq-hq',
  template: require('./iq-hq.component.html'),
  styleUrls: ['./iq-hq.component.css']
})
export class IqHqComponent implements OnInit {
  @Input('hq-tickers') hqTickers: HqTicker[];
  tickers: string[];
  iqHqTickers: IqHqTicker[];

  csv: string='';

  constructor(
    private hqDataService: HqDataService
  ) { }

  ngOnInit() {
    // this.getTickers();
  }
  ngOnChanges() {}

  btnWsIq(ticker) {
    let url = `http://chartapi.finance.yahoo.com/instrument/1.0/${ticker}/chartdata;type=quote;range=1d/csv`;
    let observable = HqUtils.intervalWsProxy(url, 10000);
    observable
      .subscribe(csv => {
        let lines = csv.split('\n');
        console.log(lines.length);
        console.log(lines[lines.length-1]);
        let iqs = [];
        for(let i=17; i<lines.length; i++) {
            iqs.push(lines[i].split(','));
        }
        // this.csv += "\n" + new Date(1000 * quotes[0][_timestamp]).toString();
        // console.log(this.csv);
      });
  }
  btnRun() {
    if (this.hqTickers != null) {
      this.getIqHqTickers();
    }
  }
  getIqHqTickers() {
    this.iqHqTickers = Array<IqHqTicker>();
    // this.tickers.forEach(ticker => {
    this.hqTickers.forEach(hqTicker => {
      this.hqDataService.getCsv(`${hqTicker.ticker}_1d`) // get IQ csv
        .subscribe(csv => {
            let iqHqTicker = new IqHqTicker;
            iqHqTicker.iqTicker = HqUtils.parseIqCsv(csv);
            iqHqTicker.hq = HqUtils.iq2hq(iqHqTicker.iqTicker);
            iqHqTicker.hqTail = (iqHqTicker.hq.close - iqHqTicker.hq.low) / iqHqTicker.iqTicker.prevClose;
            if (iqHqTicker.hqTail > 0.03) {
              iqHqTicker.iqTicker.ticker = iqHqTicker.iqTicker.ticker.toUpperCase();
              this.iqHqTickers.push(iqHqTicker);
            }
          });
    });
  }
  btnTickerIq(ticker): void {
    this.hqDataService.getCsv(`${ticker}_1d`) // get IQ csv
      .subscribe(csv => {
          let iqTicker = HqUtils.parseIqCsv(csv);
          let hq = HqUtils.iq2hq(iqTicker);
        });
  }
  getTickers(): void {
    this.hqDataService.getData(environment.jsonData.tickers)
      .subscribe(data => this.tickers = data);
  }
}
