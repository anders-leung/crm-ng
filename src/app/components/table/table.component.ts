import { Component, Input, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import _ from 'lodash';
import * as moment from 'moment';

import { TableService } from './table.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { Globals, deleteRow } from 'src/app/globals';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass'],
  animations: [
    trigger('tdExpand', [
      state('collapsed', style({ border: 0 })),
      state('expanded', style({ 'border-bottom': '1px solid #d2d2d2' })),
    ]),
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class TableComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  displayedColumns: string[];
  pageSizeOptions: number[] = [5, 10, 15, 20, 25];
  pageEvent: PageEvent = new PageEvent();
  // filters: any = {};
  displayFilter: any = {};
  emptyCell: any = {
    id: '',
    value: '',
    type: '',
  };
  editCell: any = _.clone(this.emptyCell);
  typing: boolean = false;
  rawData: any[] = [];
  DATA: any[] = [];
  count: number;
  loading: boolean = true;
  pageIndex: number = 0;
  pageSize: number = 10;
  originalQuery: any;
  dataSource = new MatTableDataSource();
  tableSearchUpdate = new Subject<string>();
  searching: boolean = false;
  expandedElement = null;
  searchValue = null;

  @Input() columns: any[];
  @Input() redirectUrl: string;
  @Input() query: any;
  @Input() select: any;
  @Input() adder: any;
  @Input() getter: any;
  @Input() setter: any;
  @Input() deleter: any;
  @Input() search: boolean;
  @Input() paginate: boolean;
  @Input() totals: boolean;
  @Input() title: string;
  @Input() export: boolean;
  @Input() filters: any;
  @Input() raw: boolean;
  @Input() openNewTab: boolean;
  @Input() addForm: any;
  @Input() expandForm: any;
  @Input() single: boolean;
  @Input() uid: any;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public static queryUpdates: Subject<any> = new Subject<any>();

  constructor(
    public globals: Globals,
    private router: Router,
    private tableService: TableService,
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog,
  ) {
    this.tableSearchUpdate.pipe(debounceTime(500)).subscribe(this.tableSearch);
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    if (this.export === undefined) {
      this.export = this.globals.user.role.name === 'Administrator';
    }
    if (this.globals.user.role.name === 'Administrator') {
      this.columns = [...this.columns].concat(deleteRow);
    }

    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        this.editCell = _.cloneDeep(this.emptyCell);
      }
    });

    this.originalQuery = _.cloneDeep(this.query);
    if (this.search === undefined) this.search = true;
    if (this.paginate === undefined) this.paginate = true;
    this.displayedColumns = this.columns.filter(column => column.visible !== false).map(column => column.label);
    this.displayedColumns.forEach((column) => {
      this.filters[column] = '';
    });
    this.getData();
    TableComponent.queryUpdates.subscribe((res) => {
      Object.entries(res).forEach(([key, value]) => {
        this.filters[key] = value;
      });
      this.tableSearch();
    });
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  getData() {
    if (this.getter.length === 0) {
      return this.getter()
        .subscribe((data) => {
          if (this.raw) this.rawData = data;
          this.parseData(data);
          this.loading = false;
        });
    }
    this.getter(this.query, this.select)
      .subscribe((data: any) => {
        if (this.raw) this.rawData = data;
        this.parseData(data);
        this.loading = false;
      });
  }

  generateTable(data) {
    const table = data.map((entry) => {
      const row = { id: entry._id.toString() };
      this.columns.forEach((column) => {
        const { field, fn, type } = column;
        const value = this.getValue(entry, field, fn, type);
        row[field] = value;
      });
      return row;
    });
    return table;
  }

  parseData(data) {
    const table = this.generateTable(data);
    this.DATA = table;
    this.dataSource.data = table;

    const dates = [];
    const currencies = [];
    this.columns.forEach((column) => {
      const { field, type } = column;
      if (type === 'date') dates.push(field);
      if (type === 'currency') currencies.push(field);
    });
    this.dataSource.sortingDataAccessor = (item, property) => {
      if (dates.includes(property)) {
        const date = new Date(item[property]);
        if (isNaN(date.getTime())) return '';
        else return date.getTime();
      } else if (currencies.includes(property)) {
        const value = item[property];
        if (!value) return 0;
        return parseFloat(value);
      }
      return item[property];
    }
    this.tableSearch();
    this.loading = false;
  }

  columnSearch = () => {
    const filters = this.getFilters();
    let data = this.DATA;
    if (this.raw) data = _.cloneDeep(this.rawData);
    let filteredData = data.filter((row) => {
      const keep = Object.entries(filters).every(([field, filter]) => {
        if (typeof filter === 'function') {
          return filter(row);
        } else if (typeof filter === 'number') {
          return filter === row[field];
        } else {
          return filter.test(row[field]);
        }
      });
      return keep;
    });
    if (this.raw) {
      filteredData = this.generateTable(filteredData);
    }
    this.dataSource.data = filteredData;
  }

  tableSearch = (value = '') => {
    this.searching = true;
    this.dataSource.data = this.DATA;
    this.columnSearch();

    // if (!value) return this.searching = false;
    this.dataSource.filter = value.trim().toLowerCase()
    this.dataSource.paginator.firstPage();
    this.searching = false;
  }

  getFilters = () => {
    const filters: object = _.cloneDeep(this.filters);
    Object.entries(filters).forEach(([field, value]) => {
      if (!value) {
        delete filters[field];
        return;
      } else if (typeof value === 'string') {
        filters[field] = new RegExp(value, 'i');
      }
    });
    if (Object.keys(filters).length < 1) return {};
    return filters;
  }

  getValue(element, path, fn, type) {
    if (fn) {
      const value = fn(element);
      if (value && !isNaN(value)) return parseFloat(value).toFixed(2);
      return value;
    }

    const value = _.get(element, path);

    if (value === true) return 'Y';
    if (value === false) return '';
    if (type === 'date') {
      if (!value) return '';
      const date = new Date(value);
      if (isNaN(date.getTime())) return '';
      return moment(date).format('MMM D, YYYY');
    }
    if (typeof value === 'object') {
      if (value === null) return '';
      if (value.constructor.name === 'Array') return value.join(', ');
      if (Object.keys(value).length === 0) return '';
    }
    return value || '';
  }

  redirect(row) {
    if (!this.redirectUrl) return;

    const { id, redirectId } = row;
    const url = `${this.redirectUrl}`;
    let path = redirectId || id;

    if (this.openNewTab) {
      window.open(`${url}/${path}`);
    } else {
      const args = [url];
      if (redirectId) {
        if (Array.isArray(redirectId)) {
          args.push(...redirectId);
        } else {
          args.push(redirectId);
        }
      } else {
        args.push(id);
      }
      this.router.navigate(args);
    }
  }

  edit(element, column) {
    const { edit, expand, label, field, fn, type } = column;
    if (expand && expand(element)) this.expandedElement = this.expandedElement === element ? null : element;
    if (!edit) return;

    const id = (element.id || element._id) + label;
    if (this.editCell.id === id) return;
    let value = this.getValue(element, field, fn, type);
    if (edit.type === 'date' && value) {
      value = new Date(value);
    } else if (edit.optionsFunction) {
      edit.options = edit.optionsFunction(element);
    }

    this.editCell = {
      id,
      value,
      ...edit,
    }
  }

  selectClosed(opened, element, field) {
    if (!opened) {
      let values = this.editCell.value;
      values = values.filter(x => x);

      const valueLabelMap = {};
      this.editCell.options.forEach((option) => {
        const { label, value } = option;
        valueLabelMap[value] = label;
      });

      const display = values.map((value) => {
        return valueLabelMap[value];
      });

      const update = { [field]: values };
      this.editCell = _.clone(this.emptyCell);
      this.setter(element.id, update)
        .subscribe((response) => {
          console.log('response: ', response);
        });
      if (display) _.set(element, field, display.join(', '));
    }
  }

  onEditChange(event, element, field, set) {
    const { key, code, toDate } = event;
    if (set || toDate || key === 'Enter' || code === 'Enter') {
      const value = this.editCell.value;
      const update = { [field]: value };
      this.editCell = _.clone(this.emptyCell);
      this.setter(element.id, update)
        .subscribe((response) => {
          const { fn, type } = _.find(this.columns, { field });
          const updatedValue = this.getValue(response, field, fn, type);
          _.set(element, field, updatedValue);
          this.dataSource.data = this.DATA;
        });
    }
  }

  focusout() {
    this.editCell = _.clone(this.emptyCell);
  }

  getSum(field) {
    let sum = 0;
    if (!this.dataSource || !this.dataSource.data) return sum;

    this.dataSource.filteredData.forEach((element) => {
      const value = element[field];
      sum += value && !isNaN(value) ? parseFloat(value) : 0;
    });
    if (isNaN(sum)) return 0.00;
    return sum.toFixed(2);
  }

  exportTable() {
    const { columns, title } = this;
    const data = this.dataSource.filteredData;
    this.dataSource.sortData(this.dataSource.filteredData, this.dataSource.sort);
    this.tableService.exportAsExcelFile(data, columns, title);
  }

  deleteRow(id) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '50vw',
      data: { job: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.deleter(id)
        .subscribe((result) => {
          _.remove(this.DATA, { id });
          this.dataSource.data = this.DATA;
          this.tableSearch();
        });
    });
  }

  addRow() {
    const row: any = { ...this.addForm.default };
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '50vw',
      data: {
        config: this.addForm.form,
        row,
      },
    });

    dialogRef.afterClosed().subscribe(data => {
      if (!data) return;
      if (this.addForm.onSubmit) this.addForm.onSubmit(data);

      this.adder(data)
        .subscribe((result) => {
          const row = { id: result._id.toString() };
          this.columns.forEach((column) => {
            const { field, fn, type } = column;
            const value = this.getValue(result, field, fn, type);
            row[field] = value;
          });
          this.DATA.push(row);
          this.dataSource.data = this.DATA;
          this.tableSearch();
        });
    });
  }

  saveForm(element) {
    this.setter(element.id, element)
      .subscribe((result) => {
        console.log('saveForm result: ', result);
      });
  }
}
