import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { ClientComponent } from './clients/client/client.component';
import { HomeComponent } from './home/home.component';
import { DirectoryComponent } from './clients/directory/directory.component';

const routes: Routes = [
  // { path: '', component: IndexComponent },
  { path: '', component: HomeComponent },
  // { path: '', component: DirectoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
