import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.sass']
})

export class CheckboxComponent implements OnInit {
  @Input() label: string;
  @Input() value: string;
  @Input() styling: any;
  @Input() color: string;

  @Output() update: EventEmitter<string> = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit() { }

  ngAfterViewChecked() {
    if (!this.styling) return;
    const matches = document.getElementsByName(`${this.label}Checkbox`);
    
    if (matches.length === 0) return;
    const checkbox = matches[0];
    let style = '';
    Object.entries(this.styling).forEach(([field, value]) => {
      style += `${field}: ${value}`;
    });
    checkbox.setAttribute('style', style);
  }

  onChange() {
    this.update.emit(this.value);
  }
}
