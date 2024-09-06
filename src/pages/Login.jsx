import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { teacherLoginValidationSchema } from "../validationSchema/teacher.login.validation.schema";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <Box className='flex flex-col items-center justify-center'>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={teacherLoginValidationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(formik) => (
            <form
              className='flex flex-col gap-2 p-3 mt-10 w-1/4 min-w-fit h-1/2 rounded-lg bg-gradient-to-r from-blue-40 shadow-xl shadow-blue-500/50 '
              onSubmit={formik.handleSubmit}
            >
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
                disabled={false}
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

export default Login;
