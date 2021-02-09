import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'

import { Globals } from '../globals';

@Injectable({
  providedIn: 'root',
})

export class JobService {

  constructor(private http: HttpClient, private globals: Globals) { }

  getJob = (id) => {
    if (!id) return this.http.get<any>(`${this.globals.url}/jobs/newJob`);
    return this.http.get<any>(`${this.globals.url}/jobs/${id}`);
  }

  getJobs = (query, select) => {
    const params = new HttpParams()
      .set('query', JSON.stringify(query))
      .set('select', select.join(' '));

    return this.http.get<any>(`${this.globals.url}/jobs`, { params });
  }

  saveJob = (job) => {
    return this.http.post<any>(`${this.globals.url}/jobs`, job);
  }
  
  updateJob = (id, update) => {
    return this.http.put<any>(`${this.globals.url}/jobs/${id}`, update);
  }
  
  deleteJob = (id) => {
    return this.http.delete<any>(`${this.globals.url}/jobs/${id}`);
  }
}
