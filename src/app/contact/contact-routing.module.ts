import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactComponent } from './contact/contact.component';
import { DirectoryComponent } from './directory/directory.component';

const ContactRoutes: Routes = [
  { path: 'contacts/contact', component: ContactComponent },
  { path: 'contacts/contact/:id', component: ContactComponent },
  { path: 'contacts', component: DirectoryComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(ContactRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class ContactRoutingModule { }
