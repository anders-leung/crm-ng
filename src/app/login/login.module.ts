import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginComponent }    from './login.component';

import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatCardModule,
    FlexLayoutModule,
  ],
  declarations: [
    LoginComponent,
  ]
})
export class LoginModule {}
