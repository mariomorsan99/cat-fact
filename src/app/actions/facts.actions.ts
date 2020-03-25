import { createAction, props } from '@ngrx/store';
import { Facts } from '../models/facts-model';

export const cargarFacts = createAction('[Facts] Cargar Facts');

export const cargarFactsSuccess = createAction(
    '[Facts] Cargar Facts Success',
    props<{ facts: any }>()
);

export const cargarFactsError = createAction(
    '[Facts] Cargar Facts Error',
    props<{ payload: any }>()
);

export const loadFacts = createAction('[Filter Facts] filtra los facts por el fistname', props<{  predicate: string, facts: any  }>());