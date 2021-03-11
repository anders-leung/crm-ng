import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'

import { Globals } from '../globals';

@Injectable({
  providedIn: 'root',
})

export class UsersService {

  constructor(private http: HttpClient, public globals: Globals) { }

  getOptions = () => {
    return this.http.get<any>(`${this.globals.url}/users/options`);
  }

  getUsers = (query, select) => {
    const params = new HttpParams()
      .set('query', JSON.stringify(query))
      .set('select', select.join(' '));

    return this.http.get<any>(`${this.globals.url}/users`, { params });
  }

  getJobs = (query, select) => {
    Object.defineProperty(RegExp.prototype, 'toJSON', { value: RegExp.prototype.toString });
    const params = new HttpParams()
      .set('query', JSON.stringify(query))
      .set('select', select.join(' '));

    return this.http.get<any>(`${this.globals.url}/users/jobs`, { params });
  }
  
  updateJob = (id, update) => {
    return this.http.put<any>(`${this.globals.url}/jobs/${id}`, update);
  }

  createUser = (user) => {
    return this.http.post<any>(`${this.globals.url}/users`, user);
  }
  
  updateUser = (id, update) => {
    return this.http.put<any>(`${this.globals.url}/users/${id}`, update);
  }
  
  deleteUser = (id) => {
    return this.http.delete<any>(`${this.globals.url}/users/${id}`);
  }
}
