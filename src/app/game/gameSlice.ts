import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum GameStatuses {
  pending = 'pending',
  running = 'running',
  stopped = 'stopped',
}

export interface Game {
  score: {
    player: number;
    skyNet: number;
  };
  roundDuration?: number;
  gameStatus: GameStatuses;
}

export const initialState: Game = {
  score: {
    player: 0,
    skyNet: 0,
  },
  roundDuration: undefined,
  gameStatus: GameStatuses.pending,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    pointToPlayer: (state) => {
      state.score.player += 1;
    },
    pointToSkyNet: (state) => {
      state.score.skyNet += 1;
    },
    updateGameStatus: (state, action: PayloadAction<GameStatuses>) => {
      state.gameStatus = action.payload;
    },
    updateRoundDurationTime: (state, action: PayloadAction<string>) => {
      state.roundDuration = Number(action.payload);
    },
    resetGame: () => initialState,
  },
});

export const {
  updateRoundDurationTime,
  pointToPlayer,
  pointToSkyNet,
  updateGameStatus,
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;
