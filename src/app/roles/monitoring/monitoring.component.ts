import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import table from '../tables/monitoring';
import { RoleService } from '../role.service';

@Component({
  selector: 'roles',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.sass']
})

export class MonitoringComponent implements OnInit {
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
  ) { }

  ngOnInit() {
    this.adder = this.roleService.saveRole;
    this.getter = this.roleService.getRoles;
    this.setter = this.roleService.updateRole;
    this.deleter = this.roleService.deleteRole;
  }
}
