import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import 'hammerjs';
import { MaterialModule } from '@angular/material';

import { AppRoutingModule } from './app.routing';
import { HqModule } from './hq/hq.module';
import { IqModule } from './iq/iq.module';
import { AppComponent } from './app.component';

// import { HqDataService } from './shared/hq.service';
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
    HqModule,
    IqModule,
    AppRoutingModule
  ],
  providers: [
    HqStatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
