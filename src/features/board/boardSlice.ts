import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Board } from "../../types";

type InitialState = {
  boards: Board[];
  board: Board;
};

const initialState: InitialState = {
  boards: [],
  board: {
    id: "",
    title: "",
    detail: "",
    is_completed: false,
    updated_at: "",
    created_at: "",
  },
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    saveBoardsAction: (state, action) => {
      state.boards = action.payload;
    },
    saveBoardAction: (state, action) => {
      state.board = action.payload;
    },
  },
});

export const { saveBoardsAction, saveBoardAction } = boardSlice.actions;
export const selectBoards = (state: RootState): Board[] => state.board.boards;
export const selectBoard = (state: RootState): Board => state.board.board;
export default boardSlice.reducer;
