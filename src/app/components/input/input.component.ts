import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})

export class InputComponent implements OnInit {
  on: string;
  off: string;
  clicked: boolean;
  iconButtonValue: string;

  @Input() label: string;
  @Input() value: string;
  @Input() checkLabel: string;
  @Input() checkValue: boolean;
  @Input() disabled: boolean;
  @Input() iconButton: any;
  @Input() textarea: boolean;
  @Input() rows: number;
  @Input() type: string;
  @Input() required: boolean;
  @Input() readonly: boolean;
  @Input() prefix: string;
  @Input() mask: string;
  @Input() suffix: string;
  @Input() inputType: string;
  @Input() color: string;
  @Input() thousandSeparator: string;
  @Input() dropSpecialCharacters: boolean;

  @Output() update: EventEmitter<string> = new EventEmitter<string>();
  @Output() buttonUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit() {
    if (!this.suffix) this.suffix = '';
    if (this.dropSpecialCharacters === undefined) this.dropSpecialCharacters = false;
    if (this.iconButton) {
      const { on, off, clicked } = this.iconButton;
      this.on = on;
      this.off = off;
      this.clicked = clicked;
    }
  }

  onChange() {
    if (this.type === 'postalCode') {
      this.value = this.value.toUpperCase();
    } else if (this.type === 'streetAddress') {
      this.value = this.value.split(' ')
        .map(word => word.replace(/^\w/, c => c.toUpperCase()))
        .join(' ');
    }
    this.update.emit(this.value);
  }

  onClick() {
    let value = this.clicked;
    if (this.iconButton) this.clicked = !this.clicked;
    else value = this.checkValue;
    this.buttonUpdate.emit(value);
  }
}
