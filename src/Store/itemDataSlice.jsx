import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  itemDataLoad: false,
  itemData: "loading..",
};
const itemDataSlice = createSlice({
  name: "allItemData",
  initialState,

  reducers: {
    addingData: (state, actions) => {
      state.itemData = actions.payload;
      state.itemDataLoad = true;
    },
  },
});
export const { addingData } = itemDataSlice.actions;

export default itemDataSlice.reducer;
