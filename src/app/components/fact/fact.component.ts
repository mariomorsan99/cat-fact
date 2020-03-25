import { Component, OnInit } from '@angular/core';
import { FactService } from '../../providers/fact.service';
import { Facts } from 'src/app/models/facts-model';
import { FormGroup, FormControl, Validator, FormControlName, Validators, FormArray } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { State, Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { cargarFacts } from 'src/app/actions/facts.actions';
import { loadFacts } from '../../actions/facts.actions';
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
    this.formsearch = new FormGroup({
      'searchControl': new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9]{1,25}')]),
    });
    this.formsearch.controls['searchControl'].valueChanges.subscribe(data => {
      this.keyboardData = data;
      this.findFact();
    });
  }

  ngOnInit() {
    this.store.select('facts').subscribe( ({ users, loading, error }) => {
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
    });
    this.store.dispatch( cargarFacts() );
  }

  findFact() {
    this.mesageFacts = null;
    this.store.dispatch(loadFacts({facts: this.facts, predicate: this.keyboardData}));
    this.store.select('entity').subscribe(result => {
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
        if (this.responseArrayUsersFilter.length > 0) {
           this.responseArrayUsers = this.responseArrayUsersFilter;
           this.mesageFacts = null;
          } else {
            this.responseArrayUsers = [];
            this.mesageFacts = 'La busqueda no devuelve resultados.....';
            }
      }
    });
  }

}
