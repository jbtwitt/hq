import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Hq, HqTicker } from '../../models/hq.model';
import { average } from '../../shared/average.class';

@Component({
  selector: 'app-sma',
  templateUrl: './sma.component.html',
  styleUrls: ['./sma.component.css']
})
export class SmaComponent implements OnInit, OnChanges {
  @Input('day-index') dayIndex: number;
  @Input('hq-ticker') hqTicker: HqTicker;
  @Input('days') days: number = 5;
  @Input('segments') segments: number = 5;
  sma: number[];
  trend: string;

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    this.getSma();
  }

  getSma() {
    this.sma = average.sma(this.hqTicker, this.days, this.segments, this.dayIndex);
    // determine trend
    let upCount = 0, dnCount = 0;
    let len = this.segments - 1;
    for (let i=0,j=1; i<len; i++,j++) {
      if (this.sma[i] > this.sma[j]) upCount ++;
      else if (this.sma[i] < this.sma[j]) dnCount ++;
    }
    if (upCount == len) this.trend = 'Up Trend';
    else if (dnCount == len) this.trend = 'Dn Trend';
  }
}
