import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { ButtonToggleGroupComponent } from './button-toggle-group.component';

@NgModule({
  declarations: [
    ButtonToggleGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
  ],
  providers: [
  ],
  exports: [
    ButtonToggleGroupComponent,
  ],
})
export class ButtonToggleGroupModule { }
