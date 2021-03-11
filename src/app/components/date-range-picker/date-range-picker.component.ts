import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.sass']
})

export class DateRangePickerComponent implements OnInit {
  @Input() label: string;
  @Input() value: any;
  @Input() start: string;
  @Input() end: string;
  @Input() required: boolean;
  @Input() readonly: boolean;
  @Input() color: string;
  
  @Output() update: EventEmitter<object> = new EventEmitter<object>();
  
  constructor() {}

  ngOnInit() {
    if (!this.value) this.value = {};
    if (!this.value.start) this.value.start = null;
    if (!this.value.end) this.value.end = null;
  }

  onChange() {
    this.update.emit(this.value);
  }
  
}
