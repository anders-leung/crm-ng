import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'

import { Globals } from '../globals';

@Injectable({
  providedIn: 'root',
})

export class EditorService {

  constructor(
    private http: HttpClient,
    public globals: Globals,
  ) { }

  getOptions = () => {
    return this.http.get<any>(`${this.globals.url}/editor/options`);
  }

  create = (data) => {
    return this.http.post<any>(`${this.globals.url}/editor`, data);
  }
}
