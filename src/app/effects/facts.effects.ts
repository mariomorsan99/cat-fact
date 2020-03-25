import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FactService } from '../providers/fact.service';
import * as usuariosActions from '../actions/facts.actions';

import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Facts } from '../models/facts-model';

@Injectable()
export class FactsEffects {

    constructor( private actions$: Actions, private factService: FactService) {
    }

    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuariosActions.cargarUsuarios ),
            mergeMap(
                () => this.factService.GetFacts()
                    .pipe(
                        map( users =>
                             usuariosActions.cargarUsuariosSuccess({usuarios: users}) 
                             ),
                        catchError( err => of(usuariosActions.cargarUsuariosError({ payload: err })) )
                    )
            )
        )
    );

    // loadUsers$ = createEffect(
    //     () => this.actions$.pipe(
    //         ofType( usuariosActions.loadUsers ),
    //         mergeMap(
    //             () => this.factService.GetFacts()
    //                 .pipe(
    //                     map( users =>
    //                          usuariosActions.loadUsers() 
    //                          ),
    //                     catchError( err => of(usuariosActions.cargarUsuariosError({ payload: err })) )
    //                 )
    //         )
    //     )
    // );


}