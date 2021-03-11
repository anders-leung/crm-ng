import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'

import { Globals } from '../globals';

@Injectable({
  providedIn: 'root',
})

export class OptionService {

  constructor(private http: HttpClient, public globals: Globals) { }

  getVariables = () => {
    return this.http.get<any>(`${this.globals.url}/options/options`);
  }

  getOptions = (query, select) => {
    const params = new HttpParams()
      .set('query', JSON.stringify(query))
      .set('select', select.join(' '));

    return this.http.get<any>(`${this.globals.url}/options`, { params });
  }

  createOption = (option) => {
    return this.http.post<any>(`${this.globals.url}/options`, option);
  }
  
  updateOption = (id, update) => {
    return this.http.put<any>(`${this.globals.url}/options/${id}`, update);
  }

  deleteOption = (id) => {
    return this.http.delete<any>(`${this.globals.url}/options/${id}`);
  }
}
