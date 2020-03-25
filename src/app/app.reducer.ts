import { Facts } from 'src/app/models/facts-model';
import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { FactsState, factsReducer, FactsStateEntity, entityReducer } from './reducer/facts.reducer';

export interface AppState {
    facts: FactsState,
    entity: FactsStateEntity
 }
 
export const appReducers: ActionReducerMap<AppState> = {
    facts: factsReducer,
    entity: entityReducer
 }

