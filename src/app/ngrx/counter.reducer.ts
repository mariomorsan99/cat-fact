import { Action ,createReducer, on } from '@ngrx/store';
import { increment, decrement, crear, setFiltro, unset, cargafacts } from './counter.actions';
import { Facts } from '../models/facts-model';


export const initialState = 20;


export interface FactsInitalState {

  facts: Facts[];
  loaded: boolean;
  loading: boolean;
  erro: null;

}

export const factsInitial: FactsInitalState = {
  facts: [],
  loaded: false,
  loading: false,
  erro: null
}

export const estadoInicial: Facts[] = [];

export const filtroInicial = '';

// tslint:disable-next-line: variable-name
const _contadorReducer = createReducer(initialState,
    on(increment, state => state + 1),
    on(decrement, state => state - 1),
  );

export function contadorReducer(state, action) {
    return _contadorReducer(state, action);
  }


const _todoReducer = createReducer(estadoInicial,
    on(crear, (state, {result}) => [...state]),
    on(unset, (state, {}) => [...state])
  );


// tslint:disable-next-line: adjacent-overload-signatures
export function todoReducer(state, action) {
    return _todoReducer(state, action);
  }


const _filtroReducer = createReducer(filtroInicial,
    on(setFiltro, (state, {filtro}) => filtro)
  );


// tslint:disable-next-line: adjacent-overload-signatures
export function filtroReducer(state, action) {
    return _filtroReducer(state, action);
  }


const _factsReducer = createReducer(factsInitial,
    on(cargafacts, (state, {}) => ( {...state, loading: false, loaded: true,  }))
    
  );


// tslint:disable-next-line: adjacent-overload-signatures
export function factsReducer(state, action) {
    return _factsReducer(state, action);
  }




  


