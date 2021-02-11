import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import * as moment from 'moment';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {
  date: string = moment('2021-02-11').format('MMM D, YYYY');
  messages: string[] = [
    `As the backend is deployed with Vercel, utilizing serverless functions, requests on cold
    starts may fail. Please kindly try again, and your request should continue as expected.`,
  ];

  constructor(
    private globals: Globals
  ) { }

  ngOnInit() {
    this.globals.setupPage('Home');
  }
}
