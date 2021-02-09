import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';


@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})

export class IndexComponent implements OnInit {

  constructor(
    private globals: Globals
  ) { }

  ngOnInit() {
    this.globals.setupPage('Home');
  }

}
