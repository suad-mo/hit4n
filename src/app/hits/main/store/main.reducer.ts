import { Action, createReducer, on } from '@ngrx/store';
import { Hit, HitGame } from '../../hits.model';
import { NewGameComponent } from '../new-game/new-game.component';
import * as MainAction from './main.actions';

export interface State {
  newGame: HitGame;
  xxxx: number[];
  aaaa: number[];
  isFinish: boolean;
  keyboard: boolean[];
}

const initialState: State = {
  newGame: null,
  xxxx: [],
  aaaa: [],
  isFinish: false,
  keyboard: [false, false, false, false, false, false, false, false, false, false]
};

// eslint-disable-next-line no-underscore-dangle
const _mainReducer = createReducer(
  initialState,
  on(
    MainAction.startNewGame,
    (state, action) => {
      const newGame = new HitGame(action.gamer);
      const xxxx = newGame.xxxx;
      return ({
        ...state,
        newGame,
        xxxx,
        isFinish: false
      });
    }
  ),
  on(
    MainAction.add4Number,
    (state, action) => {
      const newGame = state.newGame;
      newGame.addHit([...action.nums]);
      const isFinish = newGame.isBingo;
      const keyboard = [false, false, false, false, false, false, false, false, false, false];
      return ({
        ...state,
        newGame,
        isFinish,
        keyboard
      });
    }
  ),
  on(
    MainAction.enterNumber,
    (state, action) => {
      const aaaa = [...state.aaaa];
      aaaa.push(action.num);
      const keyboard = state.keyboard;
      keyboard[action.num] = true;
      return ({
        ...state,
        aaaa,
        keyboard
      });
    }
  )
);

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function mainReducer(state: State, action: Action) {
  return _mainReducer(state, action);
}
