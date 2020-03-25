import { createAction, props } from '@ngrx/store';
import { Facts } from 'src/app/models/facts-model';
export const increment = createAction('[Contador] incrementa');
export const decrement = createAction('[Decrementar] decrementa');

export const cargafacts: any = createAction('[cargaFacts] carga los facts');

export const cargarUsuarios = createAction('[Usuarios] Cargar Usuarios');

export const crear = createAction(
    '[TODO] carga facts', 
      props<{result: any[]}>()
      );
export const setFiltro = createAction(
        '[FILTRO] filtra todo', 
          props<{ filtro: string }>()
          );

export const unset = createAction('[UnTodo] elimina', props<{ filtro: string }>());