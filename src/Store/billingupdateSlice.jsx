import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  billupdate: false,

};

export const billingupdateSlice = createSlice({
  name: "billupdate",
  initialState,
  reducers: {
    openbillupdateModel: (state) => {
      state.billupdate = true;
    },
    closebillupdateModel: (state) => {
      state.billupdate = false;
    },
  },
});

export const { openbillupdateModel, closebillupdateModel } =
billingupdateSlice.actions;

export default billingupdateSlice.reducer;