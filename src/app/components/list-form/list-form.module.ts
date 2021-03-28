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
import { MatExpansionModule } from '@angular/material/expansion';

import { ListFormComponent } from './list-form.component';
import { FormModule } from '../form/form.module';

@NgModule({
  declarations: [
    ListFormComponent
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
    MatExpansionModule,
    FormModule,
  ],
  providers: [
  ],
  exports: [
    ListFormComponent,
  ],
})
export class ListFormModule { }
