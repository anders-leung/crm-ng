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
    `Invoice PDFs that generate with a symbol similar to "Đ" have extra spaces at the end of their lines,
    remove the extra spaces for each line in an invoice's service description to remove the symbol.`,
    `When switching PR T4 clients to One Time T4 clients, or vice versa, please simply toggle the "One Time
    T4" checkbox and press save, this will create a new job for the newly converted One Time T4 or PR T4 client
     - if there are old jobs still existing for the client's previous type, please contact Anders to remove it,
     or simply add a remark that the job is void, and fill in the required fields for the job to be considered done.`
  ];

  constructor(
    private globals: Globals
  ) { }

  ngOnInit() {
    this.globals.setupPage('Home');
  }
}
