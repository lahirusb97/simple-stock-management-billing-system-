import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  year: "",
  startdate: { syear: "", smonth: "", sd: "" },
  enddate: { eyear: "", emonth: "", ed: "" },
};

export const bilingDateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setInDate: (state, actions) => {
      // state.start = actions.payload;
      // state.end = actions.payload;
      state.startdate.syear = actions.payload.year;
      state.startdate.smonth = actions.payload.month;
      state.startdate.sd = actions.payload.day;
      // state.startD.month = actions.payload.month;
      // state.startD.day = actions.payload.day;
    },
    setEndDate: (state, actions) => {
      // state.start = actions.payload;
      // state.end = actions.payload;
      state.enddate.eyear = actions.payload.year;
      state.enddate.emonth = actions.payload.month;
      state.enddate.ed = actions.payload.day;
      // state.startD.month = actions.payload.month;
      // state.startD.day = actions.payload.day;
    },
  },
});
export const { setInDate, setEndDate } = bilingDateSlice.actions;
export default bilingDateSlice.reducer;
