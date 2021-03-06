import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { HitGame } from '../../hits.model';
import * as MainAction from './main.actions';
import * as fromApp from '../../../app.reducer';
import { act } from '@ngrx/effects';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface mainState {
  game: HitGame;
  xxxx: number[];
  aaaa: number[];
  isFinish: boolean;
  keyboard: boolean[];
  hint: boolean[][];
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
  hint: []
};

// eslint-disable-next-line no-underscore-dangle
const _mainReducer = createReducer(
  initialState,
  on(MainAction.startGame, (state, action) => {
    const game = new HitGame(action.gamer);
    const xxxx = game.xxxx;
    console.log('Unutar Start Game...', xxxx);
    return {
      ...state,
      game,
      xxxx,
      isFinish: false,
    };
  }),
  on(MainAction.addHit, (state, action) => {
    if (!state.game.isBingo && state.aaaa.length < 4) {
      const game = state.game;
      game.addHit([...action.nums]);
      const isFinish = game.isBingo;
      const keyboard = initialState.keyboard;
      return {
        ...state,
        game,
        isFinish,
        keyboard,
      };
    }
  }),
  on(MainAction.updateGame, (state, action) => ({
    ...state,
    newGame: action.updateGame,
  })),
  on(MainAction.cancelHit, (state, action) => ({
    ...state,
    aaaa: initialState.aaaa,
    keyboard: initialState.keyboard,
  })),
  // on(MainAction.addOneNumber, (state, action) => {
  //   const aaaa = [...state.aaaa];
  //   if (aaaa.length > 4) {
  //     return;
  //   }
  //   aaaa.push(action.num);
  //   const keyboard = [...state.keyboard];
  //   keyboard[action.num] = true;
  //   return {
  //     ...state,
  //     aaaa,
  //     keyboard,
  //   };
  // }
  // ),

  on(MainAction.addOneNumber, (state, action) => {
    const game = state.game;
    let aaaa = [...state.aaaa];
    let keyboard = [...state.keyboard];
    let isFinish = state.isFinish;
    const hint = [...state.hint];
    if (aaaa.length < 4) {
      aaaa.push(action.num);//update aaaa
      keyboard[action.num] = true;//update keyboard
      if (aaaa.length === 4) {
        game.addHit(aaaa);
        const h = [false, false, false, false];
        hint.push(h);
        aaaa = initialState.aaaa;
        keyboard = initialState.keyboard;
        isFinish = game.isBingo;
      }
    }
    return {
      ...state,
      game,
      isFinish: true,
      aaaa,
      keyboard,
      hint
    };
  }),
  on(MainAction.daleteOneNumber, (state, action) => {
    const aaaa = [...state.aaaa];
    aaaa.splice(action.index, 1);
    const keyboard = [...state.keyboard];
    keyboard[action.value] = false;
    return {
      ...state,
      aaaa,
      keyboard
    };
  }),
  on(MainAction.updateAaaa, (state, action) => {
    const aaaa = [...state.aaaa];
    const keyboard = [...state.keyboard];
    aaaa.push(action.num);
    return {
      ...state,
      aaaa,
      keyboard,
    };
  }),
  on(MainAction.cancelGame, (state, action) => ({
    ...state,
    game: null,
    xxxx: [],
    aaaa: [],
    isFinish: false,
    keyboard: initialState.keyboard,
    hint: []
  })),
  on(MainAction.endGame, (state, action) => ({
    ...state,
    game: null,
    xxxx: [],
    aaaa: [],
    isFinish: false,
    keyboard: initialState.keyboard,
    hint: []
  })),
  on(MainAction.addHint, (state, action) => {
    const i = action.i;
    const j = action.j;
    const hint = [...state.hint];
    if (state.game.hits[action.i].aaaa[j].t) {
      hint[i][j] = !hint[i][j];
    }
    return {
      ...state,
      hint: [...hint]
    };
  })
);

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function mainReducer(state: mainState, action: Action) {
  return _mainReducer(state, action);
}

export const getMainState = createFeatureSelector<mainState>('main');

export const getGame = createSelector(
  getMainState,
  (state: mainState) => state.game
);
export const getIsBingo = createSelector(
  getMainState,
  (state: mainState) => state.game.isBingo
);
export const getAaaa = createSelector(
  getMainState,
  (state: mainState) => state.aaaa
);
export const getXxxx = createSelector(
  getMainState,
  (state: mainState) => state.xxxx
);
export const getIsFinish = createSelector(
  getMainState,
  (state: mainState) => state.isFinish
);
export const getKeyboard = createSelector(
  getMainState,
  (state: mainState) => state.keyboard
);
export const getHint = createSelector(
  getMainState,
  (state: mainState) => state.hint
);
// export const getIsHintRow = createSelector(
//   getMainState,
//   (state: mainState) => state.hint.map(h => h[0] || h[1] || h[2] || h[3])
// );
