import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { LogService } from '../services/log.service';

@Injectable()
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected router: Router,
    protected keycloak: KeycloakService,
    private logService: LogService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree>{
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      this.logService.info('AuthGuard: I am not authenticated, logging in...');
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url
      });
    }

    // Get the roles required from the route.
    this.logService.info('AuthGuard: roles configured in the route');
    const requiredRoles = route.data['roles'];
    this.logService.info(requiredRoles);

    // Allow the user to proceed if no additional roles are required to access the route.
    if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) {
      this.logService.info('AuthGuard: roles array is empty');
      return true;
    }

    // Allow the user to proceed if all the required roles are present.
    this.logService.info('AuthGuard: I will check my roles now...');
    //return requiredRoles.every((role) => this.roles.includes(role));
    const authorized = requiredRoles.every((role) => this.roles.includes(role));
    if (authorized) {
      this.logService.info('AuthGuard: user authorized for access');
      return true;
    }
    else {
      this.logService.info('AuthGuard: user not authorized for access');
      return this.router.createUrlTree(['/unauthorized']);
    }

  }
  
}
