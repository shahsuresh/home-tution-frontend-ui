import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import $axios from "../lib/axios/axios.instance";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbarSlice";
import { adminLoginDataValidationSchema } from "../validationSchema/admin.validation.schema";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //?=== hit teacher login api =======
  const { isPending, mutate } = useMutation({
    mutationKey: ["login-admin"],
    mutationFn: async (values) => {
      return await $axios.post("/admin/login", values);
    },
    onSuccess: (res) => {
      dispatch(openSuccessSnackbar(res?.data?.message));
      navigate("/admin-dashboard");
      // extract token, lastName and first name from login response
      const accessToken = res?.data?.accessToken;
      const firstName = res?.data?.adminData?.firstName;
      const lastName = res?.data?.adminData?.lastName;
      const role = res?.data?.adminData?.role;
      // set these values to local storage|
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      localStorage.setItem("role", role);
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
      //   console.log(error);
    },
  });

  return (
    <>
      <Box className='flex flex-col items-center justify-center'>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={adminLoginDataValidationSchema}
          onSubmit={(values) => {
            mutate(values);
          }}
        >
          {(formik) => (
            <form
              className='flex flex-col w-1/4 gap-2 p-3 mt-10 rounded-lg shadow-xl min-w-fit h-1/2 bg-gradient-to-r from-blue-40 shadow-blue-500/50 '
              onSubmit={formik.handleSubmit}
            >
              {isPending && <LinearProgress color='primary' />}

              <Typography variant='h4' className='text-[#1976D2]'>
                Sign In
              </Typography>

              <FormControl>
                <TextField label='Email' {...formik.getFieldProps("email")} />
                {formik.touched.email && formik.errors.email ? (
                  <FormHelperText error>{formik.errors.email}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl>
                <TextField
                  type='password'
                  label='Password'
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <FormHelperText error>
                    {formik.errors.password}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <Button
                variant='contained'
                color='secondary'
                type='submit'
                disabled={isPending}
              >
                Login
              </Button>

              <Link to='/register'>
                <Typography variant='h6' className='text-blue-600'>
                  New here? Register
                </Typography>
              </Link>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default LoginAdmin;
