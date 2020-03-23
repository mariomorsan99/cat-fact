import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FactService {

  corsHeaders:any;
  constructor(private http: HttpClient) {

  this.corsHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '/'
    });
   }

  urlFact: any = 'http://cat-fact.herokuapp.com/facts';

  GetFacts() {
    return this.http.get(this.urlFact).pipe(map(resp => {
      console.log(resp);
    }));

  }

  public getFacts(): Observable<any> {
    const url = this.urlFact;
   
    // Full updated data return this.http.get<any>('https://cat-fact.herokuapp.com/facts');
    return this.http.get<any>('https://cat-fact.herokuapp.com/facts', { headers: this.corsHeaders }); // static subset
  }
}
