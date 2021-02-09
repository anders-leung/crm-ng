import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AddDialogComponent } from './add-dialog.component';
import { FormModule } from '../form/form.module';

@NgModule({
  declarations: [
    AddDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    FormModule,
  ],
  providers: [
  ],
  exports: [
    AddDialogComponent,
  ],
})
export class AddDialogModule { }
