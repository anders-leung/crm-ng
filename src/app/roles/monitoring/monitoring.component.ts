import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import table from '../tables/monitoring';
import { RoleService } from '../role.service';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'roles',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.sass']
})

export class MonitoringComponent implements OnInit {
  subheading: string[] = [`
    Roles determine which uri sections users can access, as well as
    what they see in the side navigation.`
  ];
  page: string = 'Roles';
  table: any = table;
  adder: any;
  getter: any;
  setter: any;
  deleter: any;
  export: boolean;
  title: string = `${this.page} - ${moment().format('MMM D, YYYY')}`;

  constructor(
    private roleService: RoleService,
    public globals: Globals,
  ) {
    this.globals.page = this.page;
  }

  ngOnInit() {
    this.adder = this.roleService.saveRole;
    this.getter = this.roleService.getRoles;
    this.setter = this.roleService.updateRole;
    this.deleter = this.roleService.deleteRole;
  }
}
