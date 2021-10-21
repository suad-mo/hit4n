import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { HitGame } from '../../hits.model';
import * as MainAction from './main.actions';
import * as fromApp from '../../../app.reducer';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface mainState {
  game: HitGame;
  xxxx: number[];
  aaaa: number[];
  isFinish: boolean;
  keyboard: boolean[];
}

export interface State extends fromApp.State {
  mainState: mainState;
}

const initialState: mainState = {
  game: null,
  xxxx: [],
  aaaa: [],
  isFinish: false,
  keyboard: [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
};

// eslint-disable-next-line no-underscore-dangle
const _mainReducer = createReducer(
  initialState,
  on(MainAction.startGame, (state, action) => {
    const newGame = action.game;
    const xxxx = newGame.xxxx;
    return {
      ...state,
      newGame,
      xxxx,
      isFinish: false,
    };
  }),
  on(
    MainAction.addHit, (state, action) => ({
      ...state,
      aaaa: action.nums
    })
  ),
  on(
    MainAction.updateGame, (state, action) => ({
      ...state,
      newGame: action.updateGame
    })
  ),
  on(
    MainAction.cancelHit,
    (state, action) => ({
      ...state,
      aaaa: initialState.aaaa,
      keyboard: initialState.keyboard
    })
  ),
  on(MainAction.enterNumber, (state, action) => {
    if (state.aaaa.length <= 4) {
      const aaaa = [...state.aaaa];
      aaaa.push(action.num);
      const keyboard = [...state.keyboard];
      keyboard[action.num] = true;
      return {
        ...state,
        aaaa,
        keyboard,
      };
    }
  }),
  on(
    MainAction.cancelGame, (state, action) => ({
      ...state,
      state: initialState
    })
  ),
  on(
    MainAction.endGame,
    (state, action) => ({
      ...state,
      state: initialState
    })
  )
);

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function mainReducer(state: mainState, action: Action) {
  return _mainReducer(state, action);
}

export const getMainState = createFeatureSelector<mainState>('main');

export const getGame = createSelector(getMainState, (state: mainState) => state.game);
export const getAaaa = createSelector(getMainState, (state: mainState) => state.aaaa);
export const getXxxx = createSelector(getMainState, (state: mainState) => state.xxxx);
export const getIsFinish = createSelector(getMainState, (state: mainState) => state.isFinish);
export const getKeyboard = createSelector(getMainState, (state: mainState) => state.keyboard);

