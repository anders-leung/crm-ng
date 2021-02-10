import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MonitoringComponent } from './monitoring/monitoring.component';

const ClientRoutes: Routes = [
  { path: 'roles', component: MonitoringComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(ClientRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class RoleRoutingModule { }
