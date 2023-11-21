import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {API_URL} from '../env';
import {AccountsView} from './accounts-view.model';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AccountsViewApiService {
  token: string;
  constructor(private http: HttpClient, protected keycloak: KeycloakService) {

    this.keycloak.getToken().then(token => {
      //console.log('token', token);
      this.token = token;
    });

  }

  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getAccountsView(view: string): Observable<AccountsView[]> {
    //const headers = {'Content-Type':'application/x-www-form-urlencoded','Authorization':'Bearer ','Accept':'application/json'};
    const headers = {'Content-Type':'application/x-www-form-urlencoded','Authorization':'Bearer ' + this.token,'Accept':'application/json'};
    return this.http
      .get<AccountsView[]>(`${API_URL}/search/?table=${view}`,{headers})
      .pipe(catchError(AccountsViewApiService._handleError));
  }

}
