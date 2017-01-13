import { Component, Input, OnInit } from '@angular/core';
import { HqStatBack2Back } from '../../models/stat.model';
import { HqStatClass } from '../../shared/hq-stat.class';

@Component({
  selector: 'app-hq-b2b',
  templateUrl: './b2b.component.html',
  styleUrls: ['./b2b.component.css']
})
export class B2bComponent implements OnInit {
  @Input('b2bs') b2bs: HqStatBack2Back[];

  constructor() { }

  ngOnInit() {
  }

}
