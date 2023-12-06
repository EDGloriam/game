import { RootState } from 'app/store';

export const selectorsGame = {
  score: (state: RootState) => state.game.score,
  roundDuration: (state: RootState) => state.game.roundDuration,
  gameStatus: (state: RootState) => state.game.gameStatus,
  cells: (state: RootState) => state.board.cells,
};
