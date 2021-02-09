import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { get } from 'lodash';
import * as moment from 'moment';

import { ClientService } from '../../clients/client.service';

import { table as monitoring } from '../tables/monitoring';
import insurance from '../tables/insurance';
import kyc from '../tables/kyc';
import { table as meeting } from '../tables/meeting';
import purchase from '../tables/purchase';
import review from '../tables/review';
import stockPurchase from '../tables/stockPurchase';
import ownStock from '../tables/ownStock';
import hub from '../tables/hub';

import { Globals } from 'src/app/globals';
import { JobService } from 'src/app/jobs/job.service';
import { OptionService } from 'src/app/option/option.service';

const tables = {
  monitoring,
  insurance,
  kyc,
  meeting,
  purchase,
  review,
  stockPurchase,
  ownStock,
  hub,
};

@Component({
  selector: 't1-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.sass']
})

export class MonitoringComponent implements OnInit {
  loading: boolean = true;
  redirectUrl: string = '/clients/client';
  page: string = 'Monitoring';
  table: any;
  adder: any;
  getter: any;
  setter: any;
  deleter: any;
  export: boolean;
  title: string = `${this.page} - ${moment().format('MMM D, YYYY')}`;

  constructor(
    private globals: Globals,
    private router: Router,
    private clientService: ClientService,
    private jobService: JobService,
    private optionService: OptionService,
  ) { }

  ngOnInit() {
    const { user } = this.globals;
    this.export = user.role === 'Administrator';
    this.adder = this.jobService.saveJob;
    this.getter = this.jobService.getJobs;
    this.setter = this.jobService.updateJob;
    this.deleter = this.jobService.deleteJob;

    // Switch tables based on path
    Object.entries(tables).forEach(([name, table]) => {
      if (this.router.url.includes(name)) {
        this.table = table;
      }
    })

    this.clientService.getOptions()
      .subscribe((options: any) => {
        options.user = this.globals.user;
        this.table = this.table(options);
        this.page = `${this.table.tabs[0].name} Monitoring`;

        // Add columns universal to all tables
        // Add to the root level columns
        this.table.columns.push({
          label: 'Redirect ID',
          field: 'redirectId',
          fn: (job) => get(job, 'client._id'),
          visible: false,
        });

        // Add columns to the nested, specific columns for each tab
        this.table.tabs.forEach((tab) => {
          if (!tab.columns) return;
          tab.columns.push({
            label: 'Redirect ID',
            field: 'redirectId',
            fn: (job) => get(job, 'client._id'),
            visible: false,
          });
        });

        this.loading = false;
      });
  }
}
