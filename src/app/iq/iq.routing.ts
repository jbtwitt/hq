import { NgModule }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IqComponent } from './iq.component';

const routes: Routes = [  
  { path: 'iq', component: IqComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class IqRoutingModule {}
