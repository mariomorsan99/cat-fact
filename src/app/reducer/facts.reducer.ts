import { createReducer, on } from '@ngrx/store';
import { cargarUsuarios, cargarUsuariosError, cargarUsuariosSuccess, filtrarUsuariosSuccess, loadUsers } from '../actions/facts.actions';
import { Facts, Users, Name } from '../models/facts-model';
import { EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';

export interface UsuariosState  {
    users: Facts[],
    loaded: boolean,
    loading: boolean,
    error: any,
    keys: string
}

export const usuariosInitialState: UsuariosState = {
    users  : [],
    loaded : false,
    loading: false,
    error  : null,
    keys: ''
}

export interface UsuariosStateEntity extends EntityState<Facts> {
    first: string,
    loaded: boolean,
    loading: boolean,
    error: any,
}

export const factsAdapter: EntityAdapter<Facts> = createEntityAdapter<Facts>();

export const defaultFacts: UsuariosStateEntity= {
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

    on( loadUsers, (state, { predicate , usuarios }) => ({ 
        ...state, 
        loading: false,
        loaded: true,
        entities: filter(usuarios, predicate)
    })),
    

    // on(loadUsers, (state, {usuarios, predicate }) => {
    //     return { ...state, first: predicate };
    //   }),


  );


const _usuariosReducer = createReducer(usuariosInitialState,

    on( cargarUsuarios, state => ({ ...state, loading: true })),

    on( cargarUsuariosSuccess, (state, { usuarios }) => ({ 
        ...state, 
        loading: false,
        loaded: true,
        users: [ ...usuarios ] 
    })),

    on( cargarUsuariosError, (state, { payload }) => ({ 
        ...state, 
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message
        }
    })),

    on( filtrarUsuariosSuccess, (state, { key, usuarios }) => ({ 
        ...state, 
        loading: false,
        loaded: true,
        users: [ ...usuarios ] ,
        keys: key
    })),

);

export function usuariosReducer(state, action) {
    return _usuariosReducer(state, action);
}


export function entityReducer(state, action) {
    return _entityReducer(state, action);
}


function filter(usuarios: any, predicate) {

   var resultEntity : any;

   var results: string[]; 
   var arrayresults= new Array(); 
//    results = usuarios.find(t => t.user.name.first === 'Kasimir' );

   results = usuarios.find(item => {
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
   console.log(usuarios);
   console.log(predicate);
   console.log(results);
   return( resultEntity);
}