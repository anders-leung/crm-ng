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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { InputModule } from '../components/input/input.module';
import { SelectModule } from '../components/select/select.module';
import { DatepickerModule } from '../components/datepicker/datepicker.module';
import { ButtonToggleGroupModule } from '../components/button-toggle-group/button-toggle-group.module';
import { TableModule } from '../components/table/table.module';
import { FormModule } from '../components/form/form.module';
import { TabbedTableModule } from '../components/tabbed-table/tabbed-table.module';
import { ListFormModule } from '../components/list-form/list-form.module';

import { InvoicesComponent } from './invoices/invoices.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SalesComponent } from './sales/sales.component';
import { OutstandingComponent } from './outstanding/outstanding.component';
import { PaymentsComponent } from './payments/payments.component';

import { InvoiceRoutingModule } from './invoice-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InvoiceRoutingModule,
    MatCardModule,
    MatExpansionModule,
    MatDividerModule,
    MatGridListModule,
    MatButtonModule,
    MatTabsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    FlexModule,
    InputModule,
    SelectModule,
    DatepickerModule,
    ButtonToggleGroupModule,
    MatIconModule,
    FlexLayoutModule,
    TableModule,
    FormModule,
    TabbedTableModule,
    ListFormModule,
  ],
  providers: [
  ],
  declarations: [
    InvoicesComponent,
    InvoiceComponent,
    SalesComponent,
    OutstandingComponent,
    PaymentsComponent,
  ],
  exports: [
  ]
})
export class InvoiceModule {}
