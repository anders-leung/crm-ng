import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OptionsComponent } from './options/options.component';

const OptionsRoutes: Routes = [
  { path: 'options', component: OptionsComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(OptionsRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class OptionsRoutingModule { }
