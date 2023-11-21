import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LogService } from './services/log.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserNotAuthorizedComponent } from './user-not-authorized/user-not-authorized.component';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    UserNotAuthorizedComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AdminModule,
    AccountsModule,
    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    LogService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
