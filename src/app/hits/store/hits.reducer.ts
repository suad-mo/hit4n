/* eslint-disable max-len */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable no-underscore-dangle */
import { HitGame } from '../hits.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as HitsActions from './hits.actions';

export interface State {
  gamer: string;
  newGame: HitGame;
  topTenGames: HitGame[];
  index: number;
  loading: boolean;
}

const initialState: State = {
  gamer: 'Guest',
  newGame: null,
  topTenGames: [],
  index: -1,
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
      topTenGames: action.topTenGames ? action.topTenGames : [...state.topTenGames],
      loading: false,
      index: -1
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
      loading: true
    })
  ),
  on(
    HitsActions.endChangeLS,
    (state, action) => ({
      ...state,
      gamer: action.gamer,
      topTenGames: [...action.topTenGames],
      loading: false,
      index: -1
    })
  ),
  on(
    HitsActions.setIndexGame,
    (state, action) => ({
      ...state,
      index: action.index
    })
  )
  // ,
  // on(
  //   HitsActions.addNewGameInTopTen,
  //   (state, actions) => {
  //     let x;
  //     return {
  //       ...state,
  //       topTenGames = actions.
  //     };
  //   }
  // )
);

export function hitsReducer(state: State, action: Action) {
  return _hitsReducer(state, action);
}

export const getTopTenGames = (state: State) => state.topTenGames ? state.topTenGames : [];

export const getGamer = (state: State) => state.gamer ? state.gamer : null;

export const getOneGame = (state: State) =>
    (state.index >= 0 && state.topTenGames.length > state.index)
    ? state.topTenGames[state.index]
    : null;
