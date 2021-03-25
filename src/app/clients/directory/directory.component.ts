import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import * as moment from 'moment';

import { ClientService } from '../client.service';

import { table } from '../tables/directory';
import { Globals } from 'src/app/globals';

@Component({
  selector: 't1-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.sass']
})

export class DirectoryComponent implements OnInit {
  subheading: string[] = [`Double clicking any row will take you to the client's details.`];
  redirectUrl: string = '/clients/client';
  page: string = 'Client Directory';
  table: any;
  adder: any;
  getter: any;
  setter: any;
  deleter: any;
  title: string = `${this.page} - ${moment().format('MMM D, YYYY')}`;
  clientsCount: number;

  constructor(
    public globals: Globals,
    private clientService: ClientService,
  ) {
    this.globals.page = this.page;
  }

  ngOnInit() {
    this.adder = this.clientService.saveClient;
    this.getter = this.clientService.getClients;
    this.setter = this.clientService.updateClient;
    this.deleter = this.clientService.deleteClient;
    this.table = table(this.globals.user);
    this.clientService.getClients({}, [])
      .subscribe((clients) => {
        this.clientsCount = clients.length;
      });
  }

  generateClients(e) {
    e.preventDefault();
    this.clientService.generateClients()
      .subscribe();
  }
}
