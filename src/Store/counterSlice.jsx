import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addItem: false,
};

export const counterSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openAddModel: (state) => {
      state.addItem = true;
    },
    closeAddModel: (state) => {
      state.addItem = false;
    },
  },
});

export const { openAddModel, closeAddModel } = counterSlice.actions;

export default counterSlice.reducer;
