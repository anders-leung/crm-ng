import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvoicesComponent } from './invoices/invoices.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SalesComponent } from './sales/sales.component';
import { OutstandingComponent } from './outstanding/outstanding.component';
import { PaymentsComponent } from './payments/payments.component';

const InvoiceRoutes: Routes = [
  { path: 'invoices/outstanding', component: InvoicesComponent },
  { path: 'invoices/all', component: InvoicesComponent },
  { path: 'invoices/new', component: InvoiceComponent },
  { path: 'invoices/:id', component: InvoiceComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(InvoiceRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class InvoiceRoutingModule { }
