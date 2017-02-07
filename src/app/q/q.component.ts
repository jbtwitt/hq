import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Hq, HqTicker } from '../models/hq.model';
import { Const, HqUtils } from '../shared/hq-utils';
import { HqDataService } from '../shared/hq.service';
import { HqStatService } from '../shared/hq-stat.service';

@Component({
  selector: 'app-q',
  template: `
  <div *ngFor="let ticker of tickers">
  <button md-raised-button (click)="btn(ticker)">{{ticker}}</button>
  </div>
  <div>
  <span *ngFor="let value of cols">{{value}}</span>,
  </div>
  `,
})
export class QComponent {
  tickers: string[] = ['NUGT', 'LABU']
  cols: string[];
  constructor(
    private hqDataService: HqDataService,
    private hqStatService: HqStatService
  ) { }
  btn(ticker) {
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
        this.cols = iqs[0];
        console.log(HqUtils.iqTimestamp( iqs[0][Const.iq.timestamp]) );
      });
  }
}
