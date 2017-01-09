import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { Hq, HqTicker } from '../../models/hq.model';
import { HqDataService } from '../../shared/hq.service';
import { HqStatService } from '../../shared/hq-stat.service';
import { HqUtils } from '../../shared/hq-utils';

@Component({
  selector: 'app-hq-csv',
  templateUrl: './hq-csv.component.html',
  styleUrls: ['./hq-csv.component.css']
})
export class HqCsvComponent implements OnInit, OnChanges {
  @Input('hq-ticker') hqTicker: HqTicker;
  hqs: Hq[];

  constructor(
    private hqDataService: HqDataService,
    private hqStatService: HqStatService
  ) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.hqTicker != null) {
      this.hqs = this.hqTicker.hqs;
    }
  }

  btnSortByClose(): void {
      this.hqs = HqUtils.hqSortByClose(this.hqTicker.hqs);
  }
}
