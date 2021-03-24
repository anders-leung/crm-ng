import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Globals } from '../../globals';
import { TableComponent } from '../table/table.component';
import * as moment from 'moment';

@Component({
  selector: 'tabbed-table',
  templateUrl: './tabbed-table.component.html',
  styleUrls: ['./tabbed-table.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TabbedTableComponent implements OnInit {
  @Input() redirectUrl: string;
  @Input() table: any;
  @Input() queries: any[];
  @Input() adder: any;
  @Input() getter: any;
  @Input() setter: any;
  @Input() deleter: any;
  @Input() search: boolean;
  @Input() paginate: boolean;
  @Input() dropdown: any;
  @Input() items: string[];
  @Input() title: string;
  @Input() export: boolean;
  @Input() filters: any;
  @Input() raw: boolean;

  selected: number = 0;
  loading: boolean = true;
  pageIndex: number = 0;
  pageSize: number = 10;
  tabs: any[];
  columns: any[];
  addForm: any;
  expandForm: any;
  selection: string;
  today: string = moment().format('MMM D, YYYY');

  constructor(public globals: Globals) { }

  ngOnInit() {
    this.setup();
  }

  ngOnChanges(changes: any) {
    Object.entries(changes).forEach(([key, value]: any) => {
      if (value) this[key] = value.currentValue;
    });
    this.setup();
  }
  
  setup() {
    if (!this.table) return;
    const { tabs, columns, addForm, expandForm } = this.table;
    this.getColumns(tabs, columns);
    this.tabs = tabs;
    this.columns = columns;
    this.addForm = addForm;
    this.expandForm = expandForm;
    this.loading = false;
    if (this.filters === undefined) this.filters = {};
    if (this.dropdown) {
      this.selected = 1;
      this.selection = this.items[0];
    } else {
      this.dropdown = false;
    }
  }

  getColumns = (tabs, columns) => {
    const columnsSelect = columns.map(column => column.field);
    tabs.forEach((tab) => {
      let which = columnsSelect;
      if (tab.columns) which = tab.columns.map(column => column.field);
      tab.select = which;
    });
  }

  dropdownSelectionChange(item) {
    if (item === this.selection) return;
    this.selection = item;
    this.tabs.forEach((tab) => {
      const update = { [this.dropdown.field]: (obj) => obj[this.dropdown.field] == item };
      TableComponent.queryUpdates.next(update);
    });
  }
}
