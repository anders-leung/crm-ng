import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'

import { Globals } from '../globals';

@Injectable({
  providedIn: 'root',
})

export class RoleService {

  constructor(
    private http: HttpClient,
    public globals: Globals
  ) { }

  getRoles = (query, select) => {
    const params = new HttpParams()
      .set('query', JSON.stringify(query))
      .set('select', select.join(' '));

    return this.http.get<any>(`${this.globals.url}/roles`, { params });
  }

  saveRole = (job) => {
    return this.http.post<any>(`${this.globals.url}/roles`, job);
  }
  
  updateRole = (id, update) => {
    return this.http.put<any>(`${this.globals.url}/roles/${id}`, update);
  }
  
  deleteRole = (id) => {
    return this.http.delete<any>(`${this.globals.url}/roles/${id}`);
  }
}
