import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { UsersService } from '../users.service';

import { table } from '../tables/users';

import { Globals } from 'src/app/globals';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})

export class UsersComponent implements OnInit {
  page: string = 'Users List';
  selected: string;
  options: string[];
  table: any = table; 
  adder: any;
  getter: any;
  setter: any;
  deleter: any;

  constructor(
    private usersService: UsersService,
    private globals: Globals,
  ) { }

  ngOnInit() {
    this.adder = this.usersService.createUser;
    this.getter = this.usersService.getUsers;
    this.setter = this.usersService.updateUser;
    this.deleter = this.usersService.deleteUser;
  }
}
