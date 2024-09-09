import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./slices/snackbarSlice";
const reduxStore = configureStore({
  reducer: {
    snackbar: snackbarReducer,
  },
});
export default reduxStore;
