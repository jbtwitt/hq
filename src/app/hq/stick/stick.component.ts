import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { Hq, HqTicker } from '../../models/hq.model';
import { CandleStick } from '../../shared/candlestick.class';

@Component({
  selector: 'app-stick',
  templateUrl: './stick.component.html',
  styleUrls: ['./stick.component.css']
})
export class StickComponent implements OnInit, OnChanges {
  @Input('hq-ticker') hqTicker: HqTicker;
  @Input('day-index') dayIndex: number;
  patterns: string[];

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    this.getPatterns();
  }
  getPatterns() {
    this.patterns = new CandleStick(this.hqTicker, this.dayIndex).run();
  }
}
