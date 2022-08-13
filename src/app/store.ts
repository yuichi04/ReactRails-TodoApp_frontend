import { configureStore } from "@reduxjs/toolkit";
import { useSelector as rawUseSelector, TypedUseSelectorHook } from "react-redux";
import boardReducer from "../features/board/boardSlice";
import loadingReducer from "../features/loading/loadingSlice";

export const store = configureStore({
  reducer: {
    board: boardReducer,
    loading: loadingReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
