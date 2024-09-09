import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "../store/slices/snackbarSlice";

const CustomSnackbar = () => {
  const dispatch = useDispatch();
  const { open, severity, message } = useSelector((state) => state.snackbar);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(closeSnackbar());
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant='filled'
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default CustomSnackbar;
