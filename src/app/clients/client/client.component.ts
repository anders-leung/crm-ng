import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { Globals } from '../../globals';

import { config } from './config';
import { ClientService } from '../client.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.sass']
})

export class ClientComponent implements OnInit {
  loading: boolean = true;
  page: string = 'Client Sheet';
  id: string;
  companies: string[] = ['IA', 'Cantrust'];
  client: any;
  invoices: any = {
    ia: [],
    cantrust: [],
  };
  config: any;
  redirectUrl: string = '/invoice/invoice';
  files: any;
  activeStatuses: string[] = ['Active', 'No YE', 'New'];

  saving: boolean = false;

  constructor(
    private clientService: ClientService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private globals: Globals,
  ) { }

  ngOnInit() {
    if (this.globals.setupPage(this.page)) return;

    this.id = this.globals.redirectNullId(this.route);
    this.clientService.getOptions()
      .subscribe((options: any) => {
        this.clientService.getClient(this.id)
          .subscribe((client: any) => {
            if (this.id) {
              this.globals.page = `${this.page} - ${client.client.name}`;
            }
            client.client = client.client || {};
            client.client.employer = client.client.employer || {};
            client.spouse = client.spouse || {};
            client.spouse.employer = client.spouse.employer || {};
            client.insurances = client.insurances || [{ beneficiaries: [] }];
            client.insurances[0] = client.insurances[0] || { beneficiaries: [] };
            this.client = client;
            this.config = config(options);
            this.loading = false;
          });
      });
  }

  save(redirect = false) {
    this.saving = true;
    this.clientService.saveClient(this.client)
      .subscribe((response) => {
        // this.toastr.success('Client saved!');
        const { _id } = response;
        this.saving = false;
        if (redirect) return this.router.navigate(['/clients']);
        this.router.navigate([`/clients/client/${_id}`]);
        // }, (err) => {
        //   this.toastr.error('Failed to save client!', );
      });
  }

}
