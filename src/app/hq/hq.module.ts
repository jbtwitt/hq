import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';

import { HqDataService } from '../shared/hq.service';
import { HqRoutingModule } from './hq.routing'
import { HqComponent } from './hq.component';
import { HqCsvComponent } from './hq-csv/hq-csv.component';
import { EngulfingComponent } from './engulfing/engulfing.component';
import { B2bComponent } from './b2b/b2b.component';
import { StickComponent } from './stick/stick.component';
import { SmaComponent } from './sma/sma.component';
import { LinkComponent } from './link/link.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    HttpModule,
    MaterialModule.forRoot(),
    HqRoutingModule
  ],
  declarations: [
    HqComponent,
    HqCsvComponent,
    EngulfingComponent,
    B2bComponent,
    StickComponent,
    SmaComponent,
    LinkComponent
  ],
  providers: [
    HqDataService
  ]
})
export class HqModule {}
