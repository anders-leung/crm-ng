import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Globals } from '../globals';
import { LoginService } from './login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  show: boolean;
  error: any;

  constructor(
    private globals: Globals,
    private loginService: LoginService,
    private router: Router,
    private cookieService: CookieService,
  ) {
    this.globals.page = 'Login';
    this.cookieService.deleteAll();
  }

  login() {
    if (!this.email || !this.password) return;
    this.loginService.login(this.email, this.password)
      .subscribe((user) => {
        this.error = null;
        this.cookieService.set('User', JSON.stringify(user));
        this.globals.user = user;
        this.router.navigate(['/']);
      }, error => {
        this.error = error
      });
  }

  ngOnInit() {
  }

}
