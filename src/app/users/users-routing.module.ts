import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';

const UsersRoutes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'users/profile', component: ProfileComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(UsersRoutes),
  ],
  exports: [
    RouterModule,
  ],
})

export class UsersRoutingModule { }
