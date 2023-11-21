import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {API_URL} from '../env';
import {NewDeveloper} from './new-developer';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class InsertApiService {
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

  getNewDeveloper(contact: string, dryrun: string): Observable<NewDeveloper> {
    const headers = {'Content-Type':'application/x-www-form-urlencoded','Authorization':'Bearer ' + this.token,'Accept':'application/json'};
    return this.http
      .get<NewDeveloper>(`${API_URL}/insert/?contact=${contact}&dryrun=${dryrun}`,{headers})
      .pipe(catchError(InsertApiService._handleError));
  }
}



