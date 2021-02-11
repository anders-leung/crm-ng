import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Globals } from '../../globals';

import config from './config';
import { ClientService } from '../client.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.sass']
})

export class ClientComponent implements OnInit {
  page: string = 'Client Sheet';
  id: string;
  client: any;
  config: any;
  saving: boolean = false;

  constructor(
    private clientService: ClientService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private globals: Globals,
  ) {
    this.globals.loading = true;
  }

  ngOnInit() {
    if (this.globals.setupPage(this.page)) return;

    this.id = this.globals.redirectNullId(this.route);
    this.clientService.getOptions()
      .subscribe((options: any) => {
        this.clientService.getClient(this.id)
          .subscribe((client: any) => {
            if (this.id) {
              this.globals.page = `${this.page} - ${client.name}`;
            }
            this.client = client;
            this.config = config(options);
            this.globals.loading = false;
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
