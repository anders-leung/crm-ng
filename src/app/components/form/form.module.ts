import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FlexModule } from '@angular/flex-layout';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FormComponent } from './form.component';
import { InputModule } from '../input/input.module';
import { DatepickerModule } from '../datepicker/datepicker.module';
import { SelectModule } from '../select/select.module';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { AutocompleteModule } from '../autocomplete/autocomplete.module';
import { DateRangePickerModule } from '../date-range-picker/date-range-picker.module';

@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    FlexModule,
    FlexLayoutModule,
    MatIconModule,
    InputModule,
    DatepickerModule,
    DateRangePickerModule,
    SelectModule,
    CheckboxModule,
    AutocompleteModule,
  ],
  providers: [
  ],
  exports: [
    FormComponent,
  ],
})
export class FormModule { }
