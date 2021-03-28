import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { InvoiceService } from '../invoice.service';
import table from '../tables/outstanding.old';
import { TableComponent } from 'src/app/components/table/table.component';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'invoices-outstanding',
  templateUrl: './outstanding.component.html',
  styleUrls: ['./outstanding.component.sass']
})

export class OutstandingComponent implements OnInit {
  loading: boolean = true;
  redirectUrl: string = '/invoice/invoice';
  page: string = 'Invoice Outstanding';
  table: any;
  getter: any;
  setter: any;
  deleter: any;
  title: string = `BLCL Outstanding - ${moment().format('MMM D, YYYY')}`;
  filters: object = { company: 'blcl' };

  company: string = 'blcl';
  options: any = [{ label: 'Benjamin Leung & Co., Ltd.', value: 'blcl' }, { label: 'Cantrust Co.', value: 'cantrust' }];

  constructor(
    private invoiceService: InvoiceService,
    private globals: Globals,
  ) {
    this.globals.haveAccess('Administrator');
  }

  ngOnInit() {
    this.invoiceService.getOptions()
      .subscribe((options) => {
        this.table = table(options);
        this.getter = this.invoiceService.getInvoices;
        this.setter = this.invoiceService.updateInvoice;
        this.deleter = this.invoiceService.deleteInvoice;
        this.loading = false;
      });
  }
  
  selectChange(item) {
    if (item === this.company) return;
    this.company = item;
    const update = { company: item };
    
    if (item) {
      if (item === 'blcl') this.title = `BLCL Outstanding - ${moment().format('MMM D, YYYY')}`;
      else this.title = `Cantrust Outstanding - ${moment().format('MMM D, YYYY')}`;
    } else {
      this.title = 'Outstanding'
      update.company = (obj) => true ;
    }

    TableComponent.queryUpdates.next(update);
  }
}
