import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./slices/snackbarSlice";
const reduxStore = configureStore({
  reducer: {
    sanckbar: snackbarReducer,
  },
});
export default reduxStore;
