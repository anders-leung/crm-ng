import { Component, OnInit } from '@angular/core';

import { OptionService } from '../option.service';

import { table } from '../tables/options';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.sass']
})

export class OptionsComponent implements OnInit {
  subheading: string[] = [
    `New Option types will be added to the currently displayed table,
    simply refresh to see the new option type in it's own table.`,
    `These Options affect the select inputs and their options for clients when
    you go to edit or check their details.
    Plural Option types will generate multi select inputs.`
  ];
  redirectUrl: string = '';
  page: string = 'Option List';
  table: any;
  adder: any;
  getter: any;
  setter: any;
  deleter: any;

  constructor(
    public globals: Globals,
    private optionService: OptionService,
  ) {
    this.globals.page = this.page;
  }

  ngOnInit() {
    this.optionService.getVariables()
      .subscribe((options) => {
        this.adder = this.optionService.createOption;
        this.getter = this.optionService.getOptions;
        this.setter = this.optionService.updateOption;
        this.deleter = this.optionService.deleteOption;
        this.table = table(options);
      });
  }
}
