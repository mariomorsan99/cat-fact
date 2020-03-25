import { Component, OnInit } from '@angular/core';
import { FactService } from '../../providers/fact.service';
import { Facts } from 'src/app/models/facts-model';
import { FormGroup, FormControl, Validator, FormControlName, Validators, FormArray } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { State, Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { cargarUsuarios } from 'src/app/actions/facts.actions';
import { loadUsers } from '../../actions/facts.actions';
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
  responseArrayUsersFilter = new Array();
  responseArrayUsersResult = new Array();
  responseArrayFacts = new Array();
  formsearch: FormGroup;
  public keyboardData: any;
  mesageFacts: any = null;


  facts: Facts[] = [];

  constructor(private factService: FactService, private store: Store<AppState>) { 

    // this.store.select('todos').subscribe( state => {
    //   console.log(state);
    // });

  
    
    this.formsearch = new FormGroup({
      'searchControl': new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9]{1,25}')]),
    });
    this.formsearch.controls['searchControl'].valueChanges.subscribe(data => {
      this.keyboardData = data;
      this.findFact();
    });
  }

  

  ngOnInit() {
    this.store.select('usuarios').subscribe( ({ users, loading, error }) => {
      this.facts = users;
      this.resultFacts = this.facts;
      this.fact = this.facts;
      this.fact.forEach(element => {
        this.factItems = new Facts();
        this.factItems.text = element.text;
        this.factItems.user = element.user;
        this.factItems.upvotes = element.upvotes;
        this.responseArrayUsers.push(this.factItems);
     });
      this.factService.setLocalStorage(JSON.stringify(this.responseArrayUsers));
      console.log( this.facts);
    });
    this.store.dispatch( cargarUsuarios() );
  }

  findFact() {
    this.mesageFacts = null;
    console.log(this.keyboardData);
    this.store.dispatch(loadUsers({usuarios: this.facts, predicate: this.keyboardData}));
    this.store.select('entity').subscribe(result => {
      console.log(result);
      this.mesageFacts = null;
      if ( result.entities != null) {
        this.responseArrayUsersResult = [];
        this.responseArrayUsersFilter = [];
        this.responseArrayUsersResult.push(result.entities);

        this.responseArrayUsersResult[0].forEach(element => {
          this.factItems = new Facts();
          this.factItems.text = element.text;
          this.factItems.user = element.user;
          this.factItems.upvotes = element.upvotes;
          this.responseArrayUsersFilter.push(this.factItems);
       });

        console.log(this.responseArrayUsersFilter);
        if (this.responseArrayUsersFilter.length > 0) {
           this.responseArrayUsers = this.responseArrayUsersFilter;
           this.mesageFacts = null;
          } else {
            this.responseArrayUsers = [];
            this.mesageFacts = 'La busqueda no devuelve resultados.....';
            }
      }
    });

    console.log(this.responseArrayUsers);
  }

}
