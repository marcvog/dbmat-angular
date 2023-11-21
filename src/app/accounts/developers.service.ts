import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevelopersService {
  private developers$ = new BehaviorSubject<any>({});
  selectedDevelopers$ = this.developers$.asObservable();
  constructor() { }

  setDevelopers(developers: any) {
    this.developers$.next(developers);
  }
}
