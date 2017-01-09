import { NgModule }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HqComponent } from './hq.component';

const routes: Routes = [  
  { path: 'hq', component: HqComponent },
//   { path: 'budget-detail/:action/:id/:year/:fundingSourceId', component: BudgetDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HqRoutingModule {}
