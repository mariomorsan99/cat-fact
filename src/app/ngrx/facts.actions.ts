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