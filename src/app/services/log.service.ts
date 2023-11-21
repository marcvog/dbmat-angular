import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  info(msg: any) {
    console.log("[info]: " + JSON.stringify(msg));
  }
}
