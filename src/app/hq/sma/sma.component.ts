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

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    this.getSma();
  }

  getSma() {
    this.sma = average.sma(this.hqTicker, this.days, this.segments, this.dayIndex);
  }
}
