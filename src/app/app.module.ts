import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ToastrModule } from 'ngx-toastr';

import { Globals } from './globals';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { ClientModule } from './clients/client.module';
import { ContactModule } from './contact/contact.module';
import { HomeModule } from './home/home.module';
import { HttpToastrInterceptor } from './middleware/http-toastr-interceptor';
import { UsersModule } from './users/users.module';
import { OptionModule } from './option/option.module';
import { DeleteDialogModule } from './components/delete-dialog/delete-dialog.module';
import { AddDialogModule } from './components/add-dialog/add-dialog.module';
import { JobModule } from './jobs/job.module';
import { RoleModule } from './roles/role.module';
import { InvoiceModule } from './invoice/invoice.module';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    LoginModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    ClientModule,
    JobModule,
    ContactModule,
    HomeModule,
    UsersModule,
    OptionModule,
    AddDialogModule,
    DeleteDialogModule,
    RoleModule,
    InvoiceModule,
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
  ],
  providers: [
    Globals,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpToastrInterceptor,
      multi: true,
    }
  ],
  bootstrap: [
    AppComponent,
  ],
  entryComponents: [
    AddDialogComponent,
    DeleteDialogComponent,
  ],
})

export class AppModule { }
