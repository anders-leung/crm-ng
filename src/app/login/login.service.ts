import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Globals } from '../globals';

@Injectable({
  providedIn: 'root',
})

export class LoginService {

  constructor(private http: HttpClient, private globals: Globals) { }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.globals.url}/auth/login`, { email, password });
  }

}
