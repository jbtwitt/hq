import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Hq, HqTicker } from '../../models/hq.model';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {
  @Input('hq-ticker') hqTicker: HqTicker;
  @Input('day-index') dayIndex: number = 0;

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
  }

}
