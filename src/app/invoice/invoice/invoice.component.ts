import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import _ from 'lodash';

import { Globals } from '../../globals';

import { InvoiceService } from '../invoice.service';
import { InvoiceConfig } from './config';
import { ClientService } from 'src/app/clients/client.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.sass']
})

export class InvoiceComponent implements OnInit {
  page = 'Invoice';
  id: string;
  gst: number;
  pst: number;
  descriptions: any;
  loading: boolean = true;
  clients: any = {};
  invoiceConfig: any;
  invoice: any;
  disableGoTo: boolean = false;
  saving: boolean = false;
  invoiceUrl: any;
  tabIndex: number;
  oldServices: any[];

  constructor(
    private clientService: ClientService,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router,
    private globals: Globals,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    if (this.globals.setupPage(this.page)) return;
    this.id = this.globals.redirectNullId(this.route);
    const requests = [
      this.invoiceService.getOptions(),
      this.clientService.getClients({}, []),
    ];
    forkJoin(requests)
      .subscribe(([options, clients]) => {
        this.gst = options.gst;
        this.pst = options.pst;
        this.descriptions = {};
        options.services.forEach((description) => {
          const { _id, details } = description;
          this.descriptions[_id] = details;
        });
        options.clients = clients.map((client) => {
          this.clients[client.name] = client;
          return client.name;
        });
        this.invoiceConfig = InvoiceConfig(options);
        this.setupInvoice();
      });
  }

  ngDoCheck() {
    if (this.invoice) {
      this.handleClientInputs();
      this.calculateServices();
    }
  }

  setupInvoice() {
    this.invoiceService.getInvoice(this.id)
      .subscribe((invoice) => {
        const { client } = invoice;
        if (!client) invoice.client = {};
        if (this.id) {
          this.globals.page += ` - ${invoice.number} issued to ${invoice.client.name}`;
        } else {
          this.globals.page += ' - New Invoice';
          invoice.issuedBy = this.globals.user.initials;
        }

        if (invoice.services.length === 0) {
          const service = {
            service: '',
            amount: '',
            details: '',
            gst: true,
          }
          invoice.services.push(service);
        }
        this.invoice = invoice;
        if (this.id) {
          const index = this.route.snapshot.paramMap.get('tabIndex');
          this.getInvoiceUrl();
          this.tabIndex = parseInt(index);
        }
        this.oldServices = this.invoice.services.map(service => service.description);
        this.loading = false;
      });
  }

  tabChanged(event) {
    const { index } = event;
    this.tabIndex = index;
  }

  getInvoiceUrl() {
    const { number, company } = this.invoice;
    const url = `${this.globals.url}/invoices/${company}/${number}.pdf`;
    this.invoiceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  save() {
    this.saving = true;
    const invoice: any = {};
    _.merge(invoice, this.invoice);

    const valid = this.invoiceService.validate(this.invoice);
    if (!valid) return;

    this.invoiceService.saveInvoice(invoice)
      .subscribe((response) => {
        const { _id } = response;
        this.getInvoiceUrl();
        this.tabIndex = 2;
        this.router.navigate([`/invoice/invoice/${_id.toString()}`, { tabIndex: 2 }]);
        this.saving = false;
      });
  }

  handleClientInputs() {
    const { invoice } = this;
    if (invoice.client.name) {
      _.merge(invoice.client, this.clients[invoice.client.name]);
    }
  }

  calculateServices() {
    let gst = 0, pst = 0, total = 0;
    if (this.invoice.services) {
      this.invoice.services.forEach((service, i) => {
        const { amount, description } = service;
        if (service.description !== this.oldServices[i]) {
          service.details = this.descriptions[service.description];
          this.oldServices[i] = description;
        }
        gst += service.gst ? (amount * this.gst) : 0;
        pst += service.pst ? (amount * this.pst) : 0;
        // pst += parseFloat(service.pst);
        total += parseFloat(amount);
      });
      this.invoice.gst = gst.toFixed(2);
      this.invoice.pst = pst.toFixed(2);
      this.invoice.total = (total + gst + pst).toFixed(2);
    }
  }
}
