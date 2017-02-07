import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Hq, HqTicker } from '../models/hq.model';
import { HqStat } from '../models/stat.model';
import { HqUtils } from '../shared/hq-utils';
import { HqDataService } from '../shared/hq.service';
import { HqStatService } from '../shared/hq-stat.service';

@Component({
  selector: 'app-q',
  template: 'q Component',
})
export class QComponent {
  constructor(
    private hqDataService: HqDataService,
    private hqStatService: HqStatService
  ) { }
}
