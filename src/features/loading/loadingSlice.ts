import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type Loading = {
  status: boolean;
  text: string;
};

const initialState: Loading = {
  status: false,
  text: "",
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    showLoadingAction: (state, action) => {
      state.status = true;
      state.text = action.payload;
    },
    hideLoadingAction: (state) => {
      state.status = false;
      state.text = "";
    },
  },
});

export const { showLoadingAction, hideLoadingAction } = loadingSlice.actions;
export const selectLoading = (state: RootState): Loading => state.loading;
export default loadingSlice.reducer;
