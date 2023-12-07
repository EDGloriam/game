import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum CellStatus {
  default = 'default',
  pending = 'pending',
  win = 'win',
  lose = 'lose',
}

interface Board {
  cells: CellStatus[];
}

export const initialBoardState: Board = {
  cells: Array(100).fill(CellStatus.default),
};

export const boardSlice = createSlice({
  name: 'board',
  initialState: initialBoardState,
  reducers: {
    updateCellsStatuses: (state, action: PayloadAction<number | undefined>) => {
      if (action.payload) {
        state.cells[action.payload] = CellStatus.pending;
      }
    },
    resetBoard: () => initialBoardState,
  },
});

export const { updateCellsStatuses, resetBoard } = boardSlice.actions;

export default boardSlice.reducer;
