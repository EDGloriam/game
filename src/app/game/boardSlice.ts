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

export const initialState: Board = {
  cells: Array(100).fill(CellStatus.default),
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    updateCellsStatuses: (state, action: PayloadAction<number | undefined>) => {
      if (action.payload) {
        state.cells[action.payload] = CellStatus.pending;
      }
    },
    resetBoard: () => initialState,
  },
});

export const { updateCellsStatuses, resetBoard } = boardSlice.actions;

export default boardSlice.reducer;
