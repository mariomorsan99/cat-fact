import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FactService } from '../providers/fact.service';
import * as factsActions from '../actions/facts.actions';

import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Facts } from '../models/facts-model';

@Injectable()
export class FactsEffects {

    constructor( private actions$: Actions, private factService: FactService) {
    }

    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType( factsActions.cargarFacts ),
            mergeMap(
                () => this.factService.GetFacts()
                    .pipe(
                        map( fact =>
                            factsActions.cargarFactsSuccess({facts: fact}) 
                             ),
                        catchError( err => of(factsActions.cargarFactsError({ payload: err })) )
                    )
            )
        )
    );

}