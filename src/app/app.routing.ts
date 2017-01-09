import { NgModule, ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HqComponent } from './hq/hq.component';
import { HqStatComponent } from './hq-stat/hq-stat.component';
import { IqComponent } from './iq/iq.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'hq',
    pathMatch: 'full'
  },
  // { path: 'hq', component: HqComponent },
  { path: 'hq-stat', component: HqStatComponent },
  // { path: 'iq', component: IqComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}

// export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);