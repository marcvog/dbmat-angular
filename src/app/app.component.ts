import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile, KeycloakTokenParsed } from 'keycloak-js';
import { AuthService } from './auth/service/auth.service';
import { LogService } from './services/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  public userDetails: KeycloakTokenParsed | undefined = undefined;

  constructor(private authService: AuthService, private logService: LogService) {
    logService.info('AppComponent created');
  }

  public async ngOnInit() {
    this.logService.info('Running AppComponent: ngOnInit');
    this.isLoggedIn = await this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      //We are not authorized to access this endpoint 
      //this.userProfile = await this.authService.loadUserProfile();
      this.userDetails = await this.authService.getLoggedUser();
      this.logService.info('userDetails:');
      this.logService.info(this.userDetails);

    }
  }

  public login() {
    this.authService.login();
  }

  public logout() {
    this.logService.info('logging out');
    this.authService.logout();
  }
}
