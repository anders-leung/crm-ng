import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditorComponent } from './editor.component';

const ClientRoutes: Routes = [
  { path: 'editor', component: EditorComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(ClientRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class EditorRoutingModule { }
