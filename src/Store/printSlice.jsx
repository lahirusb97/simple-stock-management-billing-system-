import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  printReady: false,
};

export const printSlice = createSlice({
  name: "print",
  initialState,
  reducers: {
    printModalOpen: (state) => {
      state.printReady = true;
    },
    printModalClose: (state) => {
      state.printReady = false;
    },
  },
});
export const { printModalOpen, printModalClose } = printSlice.actions;
export default printSlice.reducer;
