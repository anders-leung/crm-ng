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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { InputModule } from '../components/input/input.module';
import { SelectModule } from '../components/select/select.module';
import { DatepickerModule } from '../components/datepicker/datepicker.module';
import { TabbedTableModule } from '../components/tabbed-table/tabbed-table.module';
import { FormModule } from '../components/form/form.module';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    MatCardModule,
    MatExpansionModule,
    MatDividerModule,
    MatGridListModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    FlexModule,
    InputModule,
    SelectModule,
    DatepickerModule,
    MatIconModule,
    FlexLayoutModule,
    TabbedTableModule,
    MatExpansionModule,
    FormModule,
  ],
  providers: [
  ],
  declarations: [
    UsersComponent,
    ProfileComponent,
  ]
})
export class UsersModule {}
