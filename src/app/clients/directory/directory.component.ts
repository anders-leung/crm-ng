import { Component, OnInit } from '@angular/core';
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
  redirectUrl: string = '/clients/client';
  page: string = 'Client Directory';
  table: any;
  adder: any;
  getter: any;
  setter: any;
  deleter: any;
  title: string = `${this.page} - ${moment().format('MMM D, YYYY')}`;

  constructor(
    private globals: Globals,
    private clientService: ClientService,
  ) { }

  ngOnInit() {
    const { user } = this.globals;
    this.adder = this.clientService.saveClient;
    this.getter = this.clientService.getClients;
    this.setter = this.clientService.updateClient;
    this.deleter = this.clientService.deleteClient;
    this.table = table(this.globals.user);
  }
}
