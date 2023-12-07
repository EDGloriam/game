import { combineReducers, configureStore } from '@reduxjs/toolkit';

import gameReducer from 'app/game/gameSlice';
import boardReducer from 'app/game/boardSlice';

const rootReducer = combineReducers({
  game: gameReducer,
  board: boardReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState: RootState) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
