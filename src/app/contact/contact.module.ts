import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';

import { InputModule } from '../components/input/input.module';
import { SelectModule } from '../components/select/select.module';
import { DatepickerModule } from '../components/datepicker/datepicker.module';
import { TableModule } from '../components/table/table.module';
import { TabbedTableModule } from '../components/tabbed-table/tabbed-table.module';
import { FormModule } from '../components/form/form.module';

import { ContactComponent } from './contact/contact.component';
import { DirectoryComponent } from './directory/directory.component';

import { ContactRoutingModule } from './contact-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContactRoutingModule,
    MatCardModule,
    MatExpansionModule,
    MatDividerModule,
    MatGridListModule,
    MatButtonModule,
    MatTabsModule,
    FlexModule,
    InputModule,
    SelectModule,
    DatepickerModule,
    MatIconModule,
    FlexLayoutModule,
    TableModule,
    TabbedTableModule,
    FormModule,
  ],
  providers: [
  ],
  declarations: [
    ContactComponent,
    DirectoryComponent,
  ]
})
export class ContactModule {}
