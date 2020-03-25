import { Component, OnInit } from '@angular/core';
import { FactService } from '../../providers/fact.service';
import { Facts } from 'src/app/models/facts-model';
import { FormGroup, FormControl, Validator, FormControlName, Validators, FormArray } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { State, Store } from '@ngrx/store';
import * as actions from '../../ngrx/counter.actions';
import { AppState } from '../../app.reducer';
import { cargarUsuarios } from 'src/app/ngrx/facts.actions';
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

  incrementar() {
    this.store.dispatch(actions.increment());
  }

  decrementar() {
    this.store.dispatch( actions.decrement());
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

    

    // this.factService.GetFacts().subscribe((resp: any) => { 
    //   this.resultFacts = this.factService.respFact.all;
    //   this.fact = this.factService.respFact.all;
    //   this.fact.forEach(element => {
    //     this.factItems = new Facts();
    //     this.factItems.text = element.text;
    //     this.factItems.user = element.user;
    //     this.factItems.upvotes = element.upvotes;
    //     this.responseArrayUsers.push(this.factItems);
    //  });

    //   this.store.dispatch(actions.crear({result: this.responseArrayUsers}));
    //   this.factService.setLocalStorage(JSON.stringify(this.responseArrayUsers));
    //   console.log( this.responseArrayUsers);
    //  });
  }

  findFact() {
    console.log(this.keyboardData);
    this.responseArrayUsersFilter = JSON.parse(this.factService.getLocalStorege());
    this.responseArrayUsers = [];
    this.responseArrayUsersResult = [];
    this.mesageFacts = null;
    this.responseArrayUsers = this.responseArrayUsersFilter.find(item => { 
      if (item.user == null) {
            return;
      }
      if (item != null) {
        if (item.user.name != null) {
          if (item.user.name.first != null) {
            if (item.user.name.first === this.keyboardData) {
              this.factItems = new Facts();
              this.factItems.text = item.text;
              this.factItems.user = item.user;
              this.factItems.upvotes = item.upvotes;
              this.responseArrayUsers.push(this.factItems);
              this.responseArrayUsersResult = this.responseArrayUsers;
             }
          }
        }
      }
    });
    if (this.responseArrayUsersResult.length > 0) {
       this.responseArrayUsers = this.responseArrayUsersResult;
    } else {
      this.mesageFacts = 'La busqueda no devuelve resultados.....';
    }
   
    console.log(this.responseArrayUsers);
  }

}
