import { Facts } from 'src/app/models/facts-model';
import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { todoReducer, filtroReducer, factsReducer, FactsInitalState } from './ngrx/counter.reducer';
import { UsuariosState, usuariosReducer } from './ngrx/facts.reducer';

// export interface AppState {
//     todos: Facts[];
//     filtro: string;
//     facts: FactsInitalState;
// }

export interface AppState {
    usuarios: UsuariosState,
 }
 
export const appReducers: ActionReducerMap<AppState> = {
    usuarios: usuariosReducer,
 }


// export const appReducers:ActionReducerMap<AppState> = {
//     todos: todoReducer,
//     filtro: filtroReducer,
//     facts: factsReducer

// }