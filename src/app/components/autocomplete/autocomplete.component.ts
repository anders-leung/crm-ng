import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.sass']
})

export class AutocompleteComponent implements OnInit {
  filteredOptions: any[] = [];
  filteredMOptions: any;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selected: string[] = [];
  formControl: FormControl;
  
  @Input() label: string;
  @Input() value: any;
  @Input() checkLabel: string;
  @Input() checkValue: boolean;
  @Input() options: any[];
  @Input() required: boolean;
  @Input() readonly: boolean;
  @Input() multiple: boolean;

  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  @Output() buttonUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor() {
    this.formControl = new FormControl();
    this.filteredMOptions = this.formControl.valueChanges.pipe(
      startWith(null),
      map((name: string) => this.filterOptions(name))
    )
  }

  ngOnInit() {
    if (this.multiple && this.value) {
      this.selected = this.value;
    }
  }

  filter(value) {
    const regex = new RegExp(value || this.value, 'i');
    this.filteredOptions = this.options.filter((option) => {
      let toMatch = option;
      const { label } = option;
      if (label) toMatch = label;
      return toMatch.match(regex);
    });
    this.update.emit(this.value);
  }
  
  onClick() {
    this.buttonUpdate.emit(this.checkValue);
  }

  // Multiple Autocomplete stuff
  filterOptions(val: string) {
    const matches = val ? this.options.filter(s => new RegExp(`${val}`, 'gi').test(s)) : this.options;
    return matches.filter(x => !this.selected.find(y => y === x));
  }

  add(event: MatAutocompleteSelectedEvent): void {
    if (!event.option) return;

    const value = event.option.value;
    if ((value || '').trim()) {
      this.selected.push(value.trim());
      this.update.emit(this.selected);
      this.formControl.setValue('');
    }
  }
  
  remove(state: string): void {
    const index = this.selected.indexOf(state);
    if (index >= 0) {
      this.selected.splice(index, 1);
      this.update.emit(this.selected);
    }
  }
  
  clear() {
    this.selected = [];
    this.update.emit(this.selected);
  }
}
