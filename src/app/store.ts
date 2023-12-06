import { configureStore } from '@reduxjs/toolkit';

import gameReducer from 'app/game/gameSlice';
import boardReducer from 'app/game/boardSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    board: boardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
