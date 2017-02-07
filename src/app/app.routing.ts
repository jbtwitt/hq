import { NgModule, ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QComponent } from './q/q.component';
import { HqStatComponent } from './hq-stat/hq-stat.component';
import { IqComponent } from './iq/iq.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'q',
    pathMatch: 'full'
  },
  { path: 'q', component: QComponent },
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