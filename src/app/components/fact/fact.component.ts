import { Component, OnInit } from '@angular/core';
import { FactService } from '../../providers/fact.service';
import { Facts } from 'src/app/models/facts-model';
declare const gapi: any;

@Component({
  selector: 'app-fact',
  templateUrl: './fact.component.html',
  styleUrls: ['./fact.component.css']
})
export class FactComponent implements OnInit {

  auth2: any;
  token: any;
  resultFacts: any; 
  resultUsers: any[] = [];
  fact: Facts[] = [];
  factItems: Facts;
  responseArrayUsers = new Array();
  responseArrayFacts = new Array();
  constructor(private factService: FactService) { }

  ngOnInit() {
    this.token = this.factService.getLocalStorege();
    console.log(this.token);
    if (this.token != null) {
      this.factService.GetFacts(this.token).subscribe((resp: any) => { 
       this.resultFacts = this.factService.respFact.all;
       this.fact = this.factService.respFact.all;
       console.log(this.fact);
       console.log(this.resultFacts);
       
       this.fact.forEach(element => {
         this.factItems = new Facts();
         this.factItems.type = element.text;
         this.factItems.user = element.user;
         this.responseArrayUsers.push(this.factItems);
      });
      

       console.log( this.responseArrayUsers);

      });

    

     
    }
  }

}
