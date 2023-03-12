import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  billItem: [],
};

export const billDataSlice = createSlice({
  name: "billData",
  initialState,
  reducers: {
    addItem: (state, actions) => {
      state.billItem.push(actions.payload);
    },
    removeItem: (state, actions) => {
      state.billItem.splice(actions.payload, 1);
    },
    deleteItem: (state) => {
      state.billItem = [];
    },
    // addId: (state, actions) => {
    //   state.billId.push(actions.payload);
    // },
    // removeId: (state, actions) => {
    //   state.billId.splice(actions.payload, 1);
    // },
    // deleteItem: (state, actions) => {
    //   state.billId.splice(actions.payload, 1);
    //   state.billItem.splice(actions.payload, 1);
    // },
  },
});

export const { addItem, removeItem, deleteItem } = billDataSlice.actions;

export default billDataSlice.reducer;
