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
  loggingIn: boolean = false;

  constructor(
    private globals: Globals,
    private loginService: LoginService,
    private router: Router,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    this.globals.page = 'Login';
    this.cookieService.deleteAll();
  }
  
  login() {
    if (!this.email || !this.password) return;
    this.loggingIn = true;
    this.loginService.login(this.email, this.password)
      .subscribe((user) => {
        this.cookieService.set('User', JSON.stringify(user));
        this.globals.user = user;
        this.router.navigate(['/']);
      }, error => {
        this.loggingIn = false;
      });
  }
}
