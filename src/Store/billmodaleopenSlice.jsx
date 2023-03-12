import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  billEdit: false,
  billData: [],
};

export const billmodaleopenSlice = createSlice({
  name: "billEdit",
  initialState,
  reducers: {
    openbillEditModel: (state) => {
      state.billEdit = true;
    },
    closebillEditModel: (state) => {
      state.billEdit = false;
    },
  },
});

export const { openbillEditModel, closebillEditModel } =
  billmodaleopenSlice.actions;

export default billmodaleopenSlice.reducer;
