import { Location } from '@angular/common';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import _ from 'lodash';
import * as moment from 'moment';

import { environment } from 'src/environments/environment';
export const yesNo = [{ label: 'Y', value: true }, { label: 'N', value: false }];
export const deleteRow = { label: 'Delete', field: 'shouldnotexist', type: 'deleteButton', export: false };
export const exists = { $nin: [undefined, null] };
export const notExists = { $in: [undefined, null] };
export const existsString = { $nin: [undefined, null, ''] };
export const notExistsString = { $in: [undefined, null, ''] };
export const phone = '(000) 000-0000';
export const email = 'A*@A*.SSSS';

@Injectable()
export class Globals {
  page: string = '';
  user: any = {};
  url: string = environment.url;
  private _loading: boolean = false;

  constructor(
    private cookieService: CookieService,
    private router: Router,
  ) { }
  
  public get loading(): boolean {
    return this._loading;
  }
  public set loading(value: boolean) {
    this._loading = value;
  }

  public redirectToLogin() {
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }

  public setupPage(page) {
    if (Object.values(this.user).length === 0) {
      this.redirectToLogin();
      return true;
    }
    this.page = page;
    return false;
  }

  public redirectNullId(route) {
    const id = route.snapshot.paramMap.get('id');
    if (id === null) {
      const url = this.router.url;
      if (url.includes('null')) {
        this.router.navigate([url.replace(/(\/[A-z0-9]+)$/, '')]);
      }
    }
    return id;
  }

  public haveAccess(uri = null, renavigate = false) {
    if (!this.user.role) return false;

    const { access, name } = this.user.role;

    // Do nothing, admin allowed
    if (name === 'Administrator') return true;

    const tokens = this.router.url.split(environment.url);
    if (!uri) uri = tokens[1];
    const hasAccess = access.some(route => uri.includes(route));
    if (!hasAccess && renavigate) this.router.navigate(['/']);

    return hasAccess;
  }

  public deleteRow(columns) {
    if (this.user) {
      const { role } = this.user;
      if (role === 'Administrator') columns.push(deleteRow);
    }
  }
}

export const getInvoices = (invoices, path = 'serviceClient.client.client._id') => {
  return (job) => {
    const client = _.get(job, path);
    const clientsInvoices = invoices.filter((invoice) => {
      if (!client || invoice.client !== client) return;
      return true;
    });
    const invoiceOptions = clientsInvoices.map((invoice) => {
      const { _id, number } = invoice;
      const option = { label: number.toString(), value: _id };
      return option;
    });
    return invoiceOptions;
  }
}

export const displayInvoices = (invoices) => {
  return (job) => {
    const { invoices: clientInvoices } = job;
    if (!clientInvoices || clientInvoices.length === 0) {
      return '';
    } else if (typeof clientInvoices === 'string') {
      const nrInvoiceIds = [];
      invoices.forEach((invoice) => {
        const { _id, number } = invoice;
        if (clientInvoices.includes(number)) {
          nrInvoiceIds.push(_id);
        }
      });
      return nrInvoiceIds;
    }
    return clientInvoices.map(invoice => invoice.number).join(', ');
  }
}

export const isT1Client = (job) => {
  const shareholders = _.get(job, 'serviceClient.client.client.shareholders', []);
  const officers = _.get(job, 'serviceClient.client.client.officers', []);
  const shareholderT1 = shareholders.some(x => x.t1);
  const officerT1 = officers.some(x => x.t1);
  return shareholderT1 || officerT1 ? 'Y' : '';
}

export const getDate = (obj, path) => {
  const date = _.get(obj, path);
  if (date) return moment(date).format('MMM D, YYYY');
  return '';
};
