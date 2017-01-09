import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';

import { HqDataService } from '../shared/hq.service';
import { IqRoutingModule } from './iq.routing'
import { IqComponent } from './iq.component';
import { IqCsvComponent } from './iq-csv/iq-csv.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    MaterialModule.forRoot(),
    IqRoutingModule
  ],
  declarations: [
    IqComponent,
    IqCsvComponent
  ],
  providers: [
    HqDataService
  ]
})
export class IqModule {}
