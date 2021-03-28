import { Component, OnInit } from '@angular/core';
import { TableComponent } from 'src/app/components/table/table.component';
import { InvoiceService } from '../invoice.service';
import { table } from '../tables/payments';
import { Globals } from 'src/app/globals';
import * as moment from 'moment';


@Component({
  selector: 'invoices-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.sass']
})

export class PaymentsComponent implements OnInit {
  loading: boolean = true;
  redirectUrl: string = '/invoice/invoice';
  page: string = 'Invoice Payment';
  table: any;
  getter: any;
  setter: any;
  deleter: any;
  title: string = 'BLCL Payments';
  filters: object = { company: 'blcl' };

  company: string = 'blcl';
  companies: any = [{ label: 'Benjamin Leung & Co., Ltd.', value: 'blcl' }, { label: 'Cantrust Co.', value: 'cantrust' }];
  week: string = '';
  weeks: string[] = [];

  constructor(
    private invoiceService: InvoiceService,
    private globals: Globals,
  ) {
    this.globals.haveAccess('Administrator');
  }

  ngOnInit() {
    this.invoiceService.getOptions()
      .subscribe((options) => {
        this.weeks = options.weeks;
        this.table = table(options);
        this.getter = this.invoiceService.getInvoices;
        this.setter = this.invoiceService.updateInvoice;
        this.deleter = this.invoiceService.deleteInvoice;
        this.loading = false;
      });
  }
  
  selectChange(item, which) {
    if (item === this[which]) return;
    this[which] = item;

    const tokens = this.title.split(' ');
    this.title = 'Payments';
    const i = tokens.findIndex(e => e === 'Payments');
    if (which === 'week') {
      this.title = tokens.slice(0, i + 1).join(' ');
    }
    if (which === 'company') {
      this.title = tokens.slice(i, tokens.length).join(' ');
    }
    let update;

    if (item) {
      if (which === 'week') {
        this.title = `${this.title} - ${item}`;
        const dates = item.split(' - ');
        const gte = new Date(dates[0]);
        const lt = new Date(dates[1]);
        gte.setDate(gte.getDate() - 1);
        lt.setDate(lt.getDate() + 1);
        update = {
          [which]: (obj) => {
            const newDate = new Date(obj.pytDate);
            const isBetween = moment(newDate).isBetween(gte, lt);
            return isBetween;
          }
        };
      } else {
        if (item === 'blcl') this.title = `BLCL ${this.title}`;
        else this.title = `Cantrust ${this.title}`;
        update = { [which]: item };
      }
    } else {
      update = { [which]: (obj) => true };
    }

    TableComponent.queryUpdates.next(update);
  }
}
