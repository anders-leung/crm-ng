import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.sass']
})

export class ListFormComponent implements OnInit {
  @Input() field: string;
  @Input() objects: any;
  @Input() config: any;

  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit() { }

  get(object, index, path, column, event) {
    if (column) {
      path = `${column}.${path}`;
    }
    if (event !== undefined) {
      if (!path) {
        this.objects[index] = event;
      } else {
        _.set(object, path, event);
      }
    }
    if (!path) return this.objects[index];
    return _.get(object, path);
  }
  
  add() {
    const objects: any[] = this.objects;
    const object = {};
    this.config.form.forEach((row) => {
      row.forEach((input) => {
        const { field, defaultValue, check, type } = input;
        if (field) {
          let value: any = '';
          switch (type) {
            case 'date': value = null; break;
            case 'checkbox': value = false; break;
            case 'form': value = []; break;
          }
          object[field] = value;
          if (defaultValue) object[field] = defaultValue;
        }
        if (check) {
          const { field: checkField, defaultValue: checkDefault } = check;
          object[checkField] = checkDefault || false;
        }
      });
    });
    if (Object.keys(object).length === 0) {
      objects.push('');
    } else {
      objects.push(object);
    }
    this.objects = objects;
  }
  
  remove(index) {
    this.objects.splice(index, 1);
  }
}