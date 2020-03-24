import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  GetFacts(token: any) {
    const tokenRequest = token;
    console.log(tokenRequest);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.urlFact, {headers}).pipe(map(resp => {
      console.log(resp);
      this.respFact = resp;
    }));

  }

  public getFacts(): Observable<any> {
    const url = this.urlFact;
    // Full updated data return this.http.get<any>('https://cat-fact.herokuapp.com/facts');
    return this.http.get<any>('https://cat-fact.herokuapp.com/facts', { headers: this.corsHeaders }); // static subset
  }


  getLocalStorege() {
   return localStorage.getItem('facts');
  }

  setLocalStorage(data: any) {
    return localStorage.setItem('facts', data);
  }


}
