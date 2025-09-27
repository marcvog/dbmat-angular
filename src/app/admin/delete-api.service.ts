import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {API_URL} from '../env';
import {Message} from './message';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class DeleteApiService {
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

  deleteDeveloper(contact: string, dryrun: string): Observable<Message> {
    const headers = {'Content-Type':'application/x-www-form-urlencoded','Authorization':'Bearer ' + this.token,'Accept':'application/json'};
    return this.http
      .get<Message>(`${API_URL}/delete/developer/?contact=${contact}&dryrun=${dryrun}`,{headers})
      .pipe(catchError(DeleteApiService._handleError));
  }

  deleteDevelopersFromGroup(model: string, dataArray: number[], groupId: number, dryrun: string): Observable<Message> {
    const headers = {'Content-Type':'application/x-www-form-urlencoded','Authorization':'Bearer ' + this.token,'Accept':'application/json'};
    // Build the query object
    const tmpArray = { data: dataArray };
    // Encode as JSON string
    const data = encodeURIComponent(JSON.stringify(tmpArray));
    return this.http
      .get<Message>(`${API_URL}/delete/?model=${model}&data=${data}&groupid=${groupId}&dryrun=${dryrun}`,{headers})
      .pipe(catchError(DeleteApiService._handleError));
  }

  deleteGroupsFromDeveloper(model: string, dataArray: number[], developerId: number, dryrun: string): Observable<Message> {
    const headers = {'Content-Type':'application/x-www-form-urlencoded','Authorization':'Bearer ' + this.token,'Accept':'application/json'};
    // Build the query object
    const tmpArray = { data: dataArray };
    // Encode as JSON string
    const data = encodeURIComponent(JSON.stringify(tmpArray));
    return this.http
      .get<Message>(`${API_URL}/delete/?model=${model}&data=${data}&developerid=${developerId}&dryrun=${dryrun}`,{headers})
      .pipe(catchError(DeleteApiService._handleError));
  }

}
