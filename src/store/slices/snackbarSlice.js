import { createSlice } from "@reduxjs/toolkit";

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    open: false,
    severity: "",
    message: "",
  },
  reducers: {
    openSuccessSnackbar: (state, action) => {
      state.open = true;
      state.severity = "success";
      state.message = action.payload;
    },
    openErrorSnackbar: (state, action) => {
      state.open = true;
      state.severity = "error";
      state.message = action.payload || "Something went wrong";
    },
    closeSnackbar: (state, action) => {
      state.open = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openSuccessSnackbar, openErrorSnackbar, closeSnackbar } =
  snackbarSlice.actions;

export default snackbarSlice.reducer;
