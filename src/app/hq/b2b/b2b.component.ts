import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Hq, HqTicker } from '../../models/hq.model';
import { HqStatBack2Back } from '../../models/stat.model';
import { HqStatClass } from '../../shared/hq-stat.class';

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
  }
  ngOnChanges() {
    this.b2bs = new HqStatClass(this.hqTicker, this.dayIndex).getB2bs();
  }

}
