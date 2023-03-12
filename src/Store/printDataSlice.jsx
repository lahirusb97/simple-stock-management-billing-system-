import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  billItems: [],
  basicData: {
    Name: "",
    Date: "",
    Mobile: "",
    BillNo: "",
    Total: "",
    Paid: "",
    PaymentLeft: "",
  },
};

export const printDataSlice = createSlice({
  name: "printData",
  initialState,
  reducers: {
    addprintItem: (state, actions) => {
      //   state.billItems.push(actions.payload);
      state.billItems = actions.payload;
    },
    deleteprintDta: (state) => {
      state.billItems = [];
    },
    setPrintData: (state, actions) => {
      state.basicData.Name = actions.payload.Name;
      state.basicData.Date = actions.payload.Date;
      state.basicData.Mobile = actions.payload.Mobile;
      state.basicData.BillNo = actions.payload.BillNo;
      state.basicData.Total = actions.payload.Total;
      state.basicData.Paid = actions.payload.Paid;
      state.basicData.PaymentLeft = actions.payload.PaymentLeft;
    },
    resetItem: (state) => {
      state.basicData.Name = "";
      state.basicData.Date = "";
      state.basicData.Mobile = "";
      state.basicData.BillNo = "";
      state.basicData.Total = "";
      state.basicData.Paid = "";
      state.basicData.PaymentLeft = "";
      state.billItems = [];
    },
  },
});

export const { addprintItem, deleteprintDta, setPrintData, resetItem } =
  printDataSlice.actions;

export default printDataSlice.reducer;
