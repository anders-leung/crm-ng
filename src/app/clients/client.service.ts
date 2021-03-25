import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'

import { Globals } from '../globals';

@Injectable({
  providedIn: 'root',
})

export class ClientService {

  constructor(private http: HttpClient, public globals: Globals) { }

  getOptions = () => {
    return this.http.get<string[]>(`${this.globals.url}/clients/options`);
  }

  getClient = (id) => {
    if (id === null) return this.http.get<any>(`${this.globals.url}/clients/newClient`);
    return this.http.get<any>(`${this.globals.url}/clients/${id}`);
  }

  getClients = (query, select) => {
    const params = new HttpParams()
      .set('query', JSON.stringify(query))
      .set('select', select.join(' '));

    return this.http.get<any>(`${this.globals.url}/clients`, { params });
  }

  saveClient = (client) => {
    return this.http.post<any>(`${this.globals.url}/clients`, client);
  }
  
  updateClient = (id, update) => {
    return this.http.put<any>(`${this.globals.url}/clients/${id}`, update);
  }

  deleteClient = (id) => {
    return this.http.delete<any>(`${this.globals.url}/clients/${id}`);
  }
  
  generateClients = () => {
    return this.http.post<any>(`${this.globals.url}/clients/generate`, {});
  }
}
