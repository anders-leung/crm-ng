import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { isEmpty } from 'lodash';

import { Globals } from '../globals';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})

export class InvoiceService {

  constructor(
    private http: HttpClient,
    private globals: Globals,
    private toastr: ToastrService,
  ) { }

  getClients = () => {
    return this.http.get<any>(`${this.globals.url}/client`);
  }

  getInvoice = (id) => {
    if (id) return this.http.get<any>(`${this.globals.url}/invoices/${id}`);
    return this.http.get<any>(`${this.globals.url}/invoices/newInvoice`);
  }

  getInvoices = (query, select) => {
    const params = new HttpParams()
      .set('query', JSON.stringify(query))
      .set('select', select.join(' '));

    return this.http.get<any>(`${this.globals.url}/invoices`, { params });
  }

  saveInvoice = (invoice) => {
    return this.http.post<any>(`${this.globals.url}/invoices`, invoice);
  }

  updateInvoice = (id, update) => {
    return this.http.put<any>(`${this.globals.url}/invoices/${id}`, update);
  }

  deleteInvoice = (id) => {
    return this.http.delete<any>(`${this.globals.url}/invoices/${id}`);
  }

  getOptions = () => {
    return this.http.get<any>(`${this.globals.url}/invoices/options`);
  }

  employeeStats = () => {
    return this.http.get<any>(`${this.globals.url}/invoice/summary`);
  }

  getAnalysis = (query) => {
    const params = new HttpParams()
      .set('query', JSON.stringify(query));

    return this.http.get<any>(`${this.globals.url}/invoices/analysis`, { params });
  }

  saveDescription = (description) => {
    return this.http.post<any>(`${this.globals.url}/description`, description);
  }

  validate = (invoice) => {
    const { client, services } = invoice;
    const errors = [];

    const validServices = services.every((service) => {
      const { amount, description } = service;
      return !!amount && !!description;
    });
    if (!validServices) errors.push('All services must have a specified service and amount');
    if (isEmpty(client)) errors.push('A client must be specified for an invoice');

    errors.forEach((error) => {
      this.toastr.error(error);
    });

    return errors.length === 0;
  }
}
