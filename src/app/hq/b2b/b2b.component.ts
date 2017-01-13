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
  diffs: number[];

  constructor() { }

  ngOnInit() {
    this.calcDiffs();
  }
  ngOnChanges() {
    this.calcDiffs();
  }
  calcDiffs() {
    this.b2bs = new HqStatClass(this.hqTicker, this.dayIndex).getB2bs();
    this.diffs = new Array<number>();
    let day0 = this.dayIndex, day1 = day0;
    for (let i=0; i<this.b2bs.length; i++) {
      let b2b = this.b2bs[i];
      day1 += (b2b.dnDays + b2b.upDays + b2b.eqDays);
      if (this.hqTicker.hqs[day1] == null) break;
      let day1Close = this.hqTicker.hqs[day1].close;
      this.diffs.push((this.hqTicker.hqs[day0].close - day1Close)/day1Close);
      day0 = day1;
    }
  }

}
