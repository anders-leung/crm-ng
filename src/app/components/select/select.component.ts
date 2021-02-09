import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { string } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass']
})

export class SelectComponent implements OnInit {
  @Input() label: string;
  @Input() value: string;
  @Input() options: any[];
  @Input() multiple: boolean;
  @Input() required: boolean;
  @Input() none: boolean;
  @Input() color: string;
  
  @Output() update: EventEmitter<string> = new EventEmitter<string>();
  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit() {
    if (this.none === undefined) this.none = true;
  }

  selectionChange() {
    this.update.emit(this.value);
  }

}
