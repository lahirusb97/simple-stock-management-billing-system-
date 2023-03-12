import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import itemEditSlice from "./itemEditSlice";
import billopenSlice from "./billopenSlice";
import itemDataSlice from "./itemDataSlice";
import billDataSlice from "./billDataSlice";
import printSlice from "./printSlice";
import printDataSlice from "./printDataSlice";
import bilingDateSlice from "./bilingDateSlice";
import billmodaleopenSlice from "./billmodaleopenSlice";
import { billingupdateSlice } from "./billingupdateSlice";
export const store = configureStore({
  reducer: {
    popup: counterSlice,
    editItemModal: itemEditSlice,
    billopen: billopenSlice,
    allItemData: itemDataSlice,
    billData: billDataSlice,
    print: printSlice,
    printData: printDataSlice,
    date: bilingDateSlice,
    billEdit: billmodaleopenSlice,
    billupdate:billingupdateSlice,
  },
});
