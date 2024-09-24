import { useMutation } from "@tanstack/react-query";
import React from "react";
import $axios from "../lib/axios/axios.instance";
import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbarSlice";
import { updateTeacherPasswordValidationSchema } from "../validationSchema/teacher.login.validation.schema";

const ChangeTeacherPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //?===========API HIT for updating Password=========================

  const { isLoading, isPending, mutate } = useMutation({
    mutationKey: ["change-teacher-password"],
    mutationFn: async (values) => {
      return await $axios.put("/teacher/profile/change-password", values);
    },
    onSuccess: (res) => {
      dispatch(openSuccessSnackbar(res?.data?.message));
      navigate("/teacher-profile");
    },
    onError: (error) => {
      navigate("/teacher-profile/change-password");
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });
  //*===================================================================
  //!======= Handle loading state=====================
  if (isLoading) {
    return (
      <Box className='flex items-center justify-center min-h-full p-4'>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box className='flex items-center justify-center min-h-full p-4 overflow-x-auto font-Playpen_Sans '>
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          conformNewPassword: "",
        }}
        validationSchema={updateTeacherPasswordValidationSchema}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Box className='w-full max-w-md p-6 "bg-white  rounded-xl shadow-[0_4px_8px_0_rgba(0,0,255,0.2)] '>
              <Typography
                variant='h4'
                className='py-2 mb-6 font-bold text-center text-white bg-blue-500 rounded'
              >
                Update Password
              </Typography>
              <Box className='space-y-4'>
                {/* //*==============Current Password=========== */}
                <Stack>
                  <span className='font-semibold text-blue-600'>
                    Current Password:
                  </span>
                  <TextField {...formik.getFieldProps("currentPassword")} />
                  {formik.touched.currentPassword &&
                  formik.errors.currentPassword ? (
                    <FormHelperText error>
                      {formik.errors.currentPassword}
                    </FormHelperText>
                  ) : null}
                </Stack>
                {/* //*=============New Password============= */}
                <Stack>
                  <span className='font-semibold text-blue-600'>
                    New Password:
                  </span>
                  <TextField
                    {...formik.getFieldProps("newPassword")}
                    type='password'
                  />
                  {formik.touched.newPassword && formik.errors.newPassword ? (
                    <FormHelperText error>
                      {formik.errors.newPassword}
                    </FormHelperText>
                  ) : null}
                </Stack>
                {/* //*================Conform New Password===================== */}
                <Stack>
                  <span className='font-semibold text-blue-600'>
                    Conform New Password:
                  </span>
                  <TextField
                    {...formik.getFieldProps("conformNewPassword")}
                    type='password'
                  />
                  {formik.touched.conformNewPassword &&
                  formik.errors.conformNewPassword ? (
                    <FormHelperText error>
                      {formik.errors.conformNewPassword}
                    </FormHelperText>
                  ) : null}
                </Stack>

                {/* //*================BUTTON===================== */}

                <Button
                  variant='contained'
                  fullWidth
                  type='submit'
                  disabled={isPending}
                >
                  {isPending ? "Updating Password" : "Change Password"}
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ChangeTeacherPassword;
