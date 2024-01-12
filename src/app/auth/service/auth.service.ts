import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile, KeycloakTokenParsed } from 'keycloak-js';
import { from, Observable } from 'rxjs';
import { LogService } from '../../services/log.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private keycloakService: KeycloakService, private logService: LogService) {}

  public getLoggedUser(): KeycloakTokenParsed | undefined {
    this.logService.info('AuthService: get user details');
    try {
      const userDetails: KeycloakTokenParsed | undefined = this.keycloakService.getKeycloakInstance()
        .idTokenParsed;
      this.logService.info('AuthService: user details:');
      this.logService.info(userDetails);
      return userDetails;
    } catch (e) {
      console.error("Exception", e);
      return undefined;
    }
  }

  public isLoggedIn() : Promise<boolean> {
    // @ts-ignore
    return this.keycloakService.isLoggedIn();
  }

  public loadUserProfile() : Promise<KeycloakProfile> {
    this.logService.info('AuthService: loadUserProfile');
    return this.keycloakService.loadUserProfile();
  }

  public login() : void {
    this.logService.info('AuthService: login');
    this.keycloakService.login();
  }

  public logout() : void {
    this.logService.info('AuthService: logout');
    this.keycloakService.logout(window.location.origin);
  }

  public redirectToProfile(): void {
    this.logService.info('AuthService: redirectToProfile');
    this.keycloakService.getKeycloakInstance().accountManagement();
  }

  public getRoles(): string[] {
    this.logService.info('AuthService: getRoles');
    return this.keycloakService.getUserRoles();
  }
}
