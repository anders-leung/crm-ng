import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-toggle-group',
  templateUrl: './button-toggle-group.component.html',
  styleUrls: ['./button-toggle-group.component.sass']
})

export class ButtonToggleGroupComponent implements OnInit {
  @Input() value: string;
  @Input() options: any[];

  @Output() update: EventEmitter<string> = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit() { }

  onChange() {
    this.update.emit(this.value);
  }
}
