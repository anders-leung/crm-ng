import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'

import { Globals } from '../globals';

@Injectable({
  providedIn: 'root',
})

export class ContactService {

  constructor(private http: HttpClient, private globals: Globals) { }

  getOptions = () => {
    return this.http.get<string[]>(`${this.globals.url}/contacts/options`);
  }

  getContact = (id) => {
    if (id === null) return this.http.get<any>(`${this.globals.url}/contacts/newContact`);
    return this.http.get<any>(`${this.globals.url}/contacts/${id}`);
  }

  getContacts = (query, select) => {
    const params = new HttpParams()
      .set('query', JSON.stringify(query))
      .set('select', select.join(' '));

    return this.http.get<any>(`${this.globals.url}/contacts`, { params });
  }

  saveContact = (client) => {
    return this.http.post<any>(`${this.globals.url}/contacts`, client);
  }
  
  updateContact = (id, update) => {
    return this.http.put<any>(`${this.globals.url}/contacts/${id}`, update);
  }
  
  deleteContact = (id) => {
    return this.http.delete<any>(`${this.globals.url}/contacts/${id}`);
  }
}
