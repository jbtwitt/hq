import { Component, Input, OnInit } from '@angular/core';

import { Iq, IqTicker } from '../../models/iq.model';
import { Hq } from '../../models/hq.model';
import { HqDataService } from '../../shared/hq.service';
import { HqUtils } from '../../shared/hq-utils';

@Component({
  selector: 'app-iq-csv',
  templateUrl: './iq-csv.component.html',
  styleUrls: ['./iq-csv.component.css']
})
export class IqCsvComponent implements OnInit {
  @Input('tickers') tickers: string[];
  selectedTicker: string;
  iqTicker: IqTicker;
  iqs: Iq[];
  csv: string;
  blendIqs: Iq[];
  hq: Hq;

  constructor(
    private hqDataService: HqDataService
  ) { }

  ngOnInit() {
  }

  btnTickerIq(ticker): void {
    this.selectedTicker = ticker;
    this.hqDataService.getCsv(`${ticker}_1d`) // get IQ csv
      .subscribe(csv => {
          this.csv = csv;
          this.iqTicker = HqUtils.parseIqCsv(csv);
          this.blendIqs = HqUtils.blendIqs(this.iqTicker.iqs, 10);
          this.hq = HqUtils.iq2hq(this.iqTicker);
          // this.iqs = this.iqs.reverse();
        });
  }
  isIqEngulfing(i: number): boolean {
    let iq = this.blendIqs[i], iq1 = this.blendIqs[i-1];
    // engulfing: high-high & low-low
    if (iq1 != null && iq.high > iq1.high && iq.low < iq1.low) {
      return true;
    }
    return false;
  }
  isIqCloseUp(i: number): boolean {
    let iq = this.blendIqs[i], iq1 = this.blendIqs[i-1];
    // engulfing: high-high & low-low
    if (iq1 != null && iq.close > iq1.close) {
      return true;
    } else if (iq1 != null && iq.close < iq1.close) {
      return false;
    }
    return null;
  }
}