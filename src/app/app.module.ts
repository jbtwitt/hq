import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import 'hammerjs';
import { MaterialModule } from '@angular/material';

import { AppRoutingModule } from './app.routing';
import { QModule } from './q/q.module';
import { HqModule } from './hq/hq.module';
import { IqModule } from './iq/iq.module';
import { AppComponent } from './app.component';

import { WsService } from './services/ws.service';
import { HqStatService } from './shared/hq-stat.service';
import { HqStatComponent } from './hq-stat/hq-stat.component';

@NgModule({
  declarations: [
    AppComponent,
    HqStatComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    HttpModule,
    QModule,
    HqModule,
    IqModule,
    AppRoutingModule
  ],
  providers: [
    HqStatService, WsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
