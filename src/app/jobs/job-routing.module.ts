import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MonitoringComponent } from './monitoring/monitoring.component';

const ClientRoutes: Routes = [
  { path: 'jobs/monitoring', component: MonitoringComponent },
  { path: 'jobs/insurance', component: MonitoringComponent },
  { path: 'jobs/kyc', component: MonitoringComponent },
  { path: 'jobs/review', component: MonitoringComponent },
  { path: 'jobs/purchase', component: MonitoringComponent },
  { path: 'jobs/meeting', component: MonitoringComponent },
  { path: 'jobs/stockPurchase', component: MonitoringComponent },
  { path: 'jobs/ownStock', component: MonitoringComponent },
  { path: 'jobs/hub', component: MonitoringComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(ClientRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class JobRoutingModule { }
