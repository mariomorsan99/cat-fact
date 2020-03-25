import { createReducer, on } from '@ngrx/store';
import { cargarFacts, cargarFactsError, cargarFactsSuccess,  loadFacts } from '../actions/facts.actions';
import { Facts, Users, Name } from '../models/facts-model';
import { EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';

export interface FactsState  {
    users: Facts[],
    loaded: boolean,
    loading: boolean,
    error: any
}

export const usuariosInitialState: FactsState = {
    users  : [],
    loaded : false,
    loading: false,
    error  : null
}

export interface FactsStateEntity extends EntityState<Facts> {
    first: string,
    loaded: boolean,
    loading: boolean,
    error: any,
}

export const factsAdapter: EntityAdapter<Facts> = createEntityAdapter<Facts>();

export const defaultFacts: FactsStateEntity= {
     ids: [ ],
     entities: { },
     first: null,
     loaded : false,
     loading: false,
     error  : null,
}

export const initialState = factsAdapter.getInitialState(defaultFacts);


const _entityReducer = createReducer(
    initialState,

    on( loadFacts, (state, { predicate , facts }) => ({ 
        ...state, 
        loading: false,
        loaded: true,
        entities: filter(facts, predicate)
    })),

  );


const _factsReducer = createReducer(usuariosInitialState,

    on( cargarFacts, state => ({ ...state, loading: true })),

    on( cargarFactsSuccess, (state, { facts }) => ({ 
        ...state, 
        loading: false,
        loaded: true,
        users: [ ...facts ] 
    })),

    on( cargarFactsError, (state, { payload }) => ({ 
        ...state, 
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message
        }
    })),

);

export function factsReducer(state, action) {
    return _factsReducer(state, action);
}


export function entityReducer(state, action) {
    return _entityReducer(state, action);
}


function filter(facts: any, predicate) {
   var resultEntity : any;
   var results: string[]; 
   var arrayresults= new Array(); 
   results = facts.find(item => {
    if (item.user == null) {
        return;
      }
    if (item != null) {
        if (item.user.name === undefined || item.user.name === null) {
            return;
        }
        if (item.user.name != null) {
      if (item.user.name.first != null) {
        if (item.user.name.first === predicate) {
            arrayresults.push(item);
         }
      }
    }
  }
  });
   results = arrayresults;
   resultEntity = results;
   return( resultEntity);
}