import { Component, OnInit } from '@angular/core';

import { InvoiceService } from '../invoice.service';
import outstanding from '../tables/outstanding';
import all from '../tables/sales';
import { Globals } from 'src/app/globals';
import { Router } from '@angular/router';

const tables = {
  outstanding,
  all,
};

@Component({
  selector: 'invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.sass']
})

export class InvoicesComponent implements OnInit {
  redirectUrl: string = '/invoices';
  page: string = 'Invoices';
  table: any;
  getter: any;
  setter: any;
  deleter: any;

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private globals: Globals
  ) { }

  ngOnInit() {
    const { user } = this.globals;
    const [ignore, uri] = this.router.url.split('/invoices/');
    const table = tables[uri];
    this.globals.setupPage(`${uri.replace(/\w/, c => c.toUpperCase())} ${this.page}`);
    this.invoiceService.getOptions()
      .subscribe((options) => {
        this.getter = this.invoiceService.getInvoices;
        this.setter = this.invoiceService.updateInvoice;
        this.deleter = this.invoiceService.deleteInvoice;
        this.table = table(options, user);
      });
  }
}
