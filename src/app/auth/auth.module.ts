import { APP_INITIALIZER } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthGuard } from './auth.guard';
import { initializer } from './keycloak-initializer';
import { AuthService } from './service/auth.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    KeycloakAngularModule,
  ],
  providers: [
    {
        provide: APP_INITIALIZER,
        useFactory: initializer,
        multi: true,
        deps: [KeycloakService]
    },
    AuthGuard,
    AuthService
  ]
})
export class AuthModule { }
