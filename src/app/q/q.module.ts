import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';

import { QComponent } from './q.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    HttpModule,
    MaterialModule.forRoot(),
  ],
  declarations: [
      QComponent,
  ],
  providers: [
  ]
})
export class QModule {}
