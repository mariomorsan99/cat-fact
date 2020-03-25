import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class FactService {

  corsHeaders:any;
  respFact: any;
  constructor(private http: HttpClient) {
   }

  urlFact: any = '/facts/';

  GetFacts()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.urlFact, {headers}).pipe(map(resp => resp['all']));
  }

  getUsers() {
    return this.http.get(`${ this.urlFact }`)
          .pipe(
            map( resp => resp)
          );
  }
  

  getLocalStorege() {
   return localStorage.getItem('facts');
  }

  setLocalStorage(data: any) {
    return localStorage.setItem('facts', data);
  }


}
