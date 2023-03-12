import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editItem: false,
  itemsData: "loading..",
};

export const itemEditSlice = createSlice({
  name: "editItemModal",
  initialState,
  reducers: {
    openEditModel: (state, actions) => {
      state.itemsData = actions.payload;

      state.editItem = true;
    },
    closeEditModel: (state) => {
      state.editItem = false;
      state.itemsData = "loading..";
    },
  },
});

export const { openEditModel, closeEditModel } = itemEditSlice.actions;

export default itemEditSlice.reducer;
