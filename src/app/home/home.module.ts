import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { DatepickerModule } from '../components/datepicker/datepicker.module';
import { FormModule } from '../components/form/form.module';
import { InputModule } from '../components/input/input.module';
import { SelectModule } from '../components/select/select.module';
import { TabbedTableModule } from '../components/tabbed-table/tabbed-table.module';
import { TableModule } from '../components/table/table.module';
import { HomeComponent } from './home.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatExpansionModule,
    MatDividerModule,
    MatGridListModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule,
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
    HomeComponent
  ]
})
export class HomeModule {}
