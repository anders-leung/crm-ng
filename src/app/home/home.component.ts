import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import * as moment from 'moment';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {
  date: string = moment('2020-01-20').format('MMM D, YYYY');
  messages: string[] = [
    `Nothing here...`,
  ];

  constructor(
    private globals: Globals
  ) { }

  ngOnInit() {
    this.globals.setupPage('Home');
  }
}
