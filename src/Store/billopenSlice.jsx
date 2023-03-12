import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openBill: false,
};

export const billopenSlice = createSlice({
  name: "billopen",
  initialState,
  reducers: {
    openBillModel: (state) => {
      state.openBill = true;
    },
    closeBillModel: (state) => {
      state.openBill = false;
    },
  },
});

export const { openBillModel, closeBillModel } = billopenSlice.actions;

export default billopenSlice.reducer;
