import { createAction, props } from '@ngrx/store';
import { Facts } from '../models/facts-model';

export const cargarUsuarios = createAction('[Usuarios] Cargar Usuarios');

export const cargarUsuariosSuccess = createAction(
    '[Usuarios] Cargar Usuarios Success',
    props<{ usuarios: any }>()
);

export const cargarUsuariosError = createAction(
    '[Usuarios] Cargar Usuarios Error',
    props<{ payload: any }>()
);


export const filtrarUsuariosSuccess = createAction(
    '[Usuarios] filtra Usuarios Success',
    props<{ key: string, usuarios: any }>()
);


export const loadUsers = createAction('[Facts] Load Users', props<{  predicate: string, usuarios: any  }>());