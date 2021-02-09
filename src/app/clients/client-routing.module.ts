import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientComponent } from './client/client.component';
import { DirectoryComponent } from './directory/directory.component';
import { MonitoringComponent } from './monitoring/monitoring.component';

const ClientRoutes: Routes = [
  { path: 'clients/client', component: ClientComponent },
  { path: 'clients/client/:id', component: ClientComponent },
  { path: 'clients', component: DirectoryComponent },
  { path: 'clients/monitoring', component: MonitoringComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(ClientRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class ClientRoutingModule { }
