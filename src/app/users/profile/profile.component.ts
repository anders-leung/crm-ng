import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';

import { config } from './config';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  page: string = 'Your Profile';
  config: any;
  user: any;

  constructor(
    private globals: Globals,
    private userService: UsersService,
  ) { }

  ngOnInit() {
    this.globals.setupPage(this.page);
    this.user = this.globals.user;
    delete this.user.password;
    const options = {
      user: this.user,
    };

    this.config = config(options);
  }

  save() {
    this.userService.updateUser(this.user._id, this.user)
      .subscribe((res) => {
        this.user = res;
        this.globals.user = res;
      });
  }
}
