import { Facts } from 'src/app/models/facts-model';
import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { UsuariosState, usuariosReducer, UsuariosStateEntity, entityReducer } from './reducer/facts.reducer';

// export interface AppState {
//     todos: Facts[];
//     filtro: string;
//     facts: FactsInitalState;
// }

export interface AppState {
    usuarios: UsuariosState,
    entity: UsuariosStateEntity
 }
 
export const appReducers: ActionReducerMap<AppState> = {
    usuarios: usuariosReducer,
    entity: entityReducer

 }




// export const appReducers:ActionReducerMap<AppState> = {
//     todos: todoReducer,
//     filtro: filtroReducer,
//     facts: factsReducer

// }