/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable no-underscore-dangle */
import { Hit, HitGame } from '../hits.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as HitsActions from './hits.actions';

export interface State {
  gamer: string;
  newGame: Hit;
  topTenGames: HitGame[];
  loading: boolean;
}

const initialState: State = {
  gamer: 'Guest',
  newGame: null,
  topTenGames: [],
  loading: false,
};

const _hitsReducer = createReducer(
  initialState,
  on(
    HitsActions.loadDataLSStart,
    (state) => ({
      ...state,
      loading: true
    })
  ),
  on(
    HitsActions.loadDataLSSuccesss,
    (state) => ({
      ...state,
      loading: true
    })
  )
);

export function hitsReducer(state: State, action: Action) {
  return _hitsReducer(state, action);
}
