import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Hq, HqTicker } from '../../models/hq.model';
import { HqStatBack2Back } from '../../models/stat.model';
import { HqStatClass } from '../../shared/hq-stat.class';
import { average } from '../../shared/average.class';

@Component({
  selector: 'app-hq-b2b',
  templateUrl: './b2b.component.html',
  styleUrls: ['./b2b.component.css']
})
export class B2bComponent implements OnInit, OnChanges {
  @Input('day-index') dayIndex: number;
  @Input('hq-ticker') hqTicker: HqTicker;
  b2bs: HqStatBack2Back[];
  sma5: number[];
  sma50: number[];

  constructor() { }

  ngOnInit() {
    // this.b2bs = new HqStatClass(this.hqTicker, this.dayIndex).getB2bs();
  }
  ngOnChanges() {
    this.b2bs = new HqStatClass(this.hqTicker, this.dayIndex).getB2bs();
    this.sma5 = average.sma(this.hqTicker, 5, 5, this.dayIndex);
    this.sma50 = average.sma(this.hqTicker, 50, 5, this.dayIndex);
  }

}
