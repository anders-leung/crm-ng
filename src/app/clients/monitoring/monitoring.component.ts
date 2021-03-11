import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { ClientService } from '../client.service';

import { table } from '../tables/monitoring';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'client-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.sass']
})

export class MonitoringComponent implements OnInit {
  redirectUrl: string = '/clients/client';
  page: string = 'Job Monitoring';
  table: any;
  getter: any;
  setter: any;
  deleter: any;
  export: boolean;
  title: string = `${this.page} - ${moment().format('MMM D, YYYY')}`;

  constructor(
    public globals: Globals,
    private clientService: ClientService,
  ) { }

  ngOnInit() {
    const { user } = this.globals;
    this.export = user.role === 'Administrator';
    this.getter = this.clientService.getInsurances;
    this.setter = this.clientService.updateInsurances;
    // this.deleter = this.clientService.deleteClient;
    this.table = table(this.globals.user);
  }
}
