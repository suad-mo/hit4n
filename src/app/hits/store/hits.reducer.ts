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
    (state, action) => ({
      ...state,
      gamer: action.gamer,
      topTenGames: [...action.topTenGames],
      loading: false
    })
  ),
  on(
    HitsActions.loadDataLSFailed,
    (state) => ({
      ...state,
      loading: false
    })
  ),
  on(
    HitsActions.startChangeLS,
    (state, action) => ({
      ...state,
      gamer: action.gamer ? action.gamer : state.gamer,
      topTenGames: action.topTenGames ? action.topTenGames : state.topTenGames
    })
  ),
  on(
    HitsActions.endChangeLS,
    (state, action) => ({
      ...state,
      gamer: action.gamer,
      topTenGames: [...action.topTenGames]
    })
  )
);

export function hitsReducer(state: State, action: Action) {
  return _hitsReducer(state, action);
}

export const getTopTenGames = (state: State) => state.topTenGames ? state.topTenGames : [];

export const getGamer = (state: State) => state.gamer ? state.gamer : null;



// on(
//   HitsActions.changeGamer,
//   (state, action) => ({
//     ...state,
//     gamer: action.gamer
//   })
// ),
// on(
//   HitsActions.changeTopTenGames,
//   (state, action) => ({
//     ...state,
//     topTenGames: [...action.topTenGames]
//   })
// ),
// on(
//   HitsActions.changeAll,
//   (state, action) => ({
//     ...state,
//     topTenGames: [...action.topTenGames],
//     gamer: action.gamer
//   })
