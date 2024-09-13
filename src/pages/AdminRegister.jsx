import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import $axios from "../lib/axios/axios.instance";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbarSlice";
import { registerAdminValidationSchema } from "../validationSchema/admin.validation.schema";

const AdminRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //?=== hit register api =======
  const { isPending, mutate } = useMutation({
    mutationKey: ["register-admin"],
    mutationFn: async (values) => {
      return await $axios.post("/admin/register", values);
    },
    onSuccess: (res) => {
      dispatch(openSuccessSnackbar(res?.data?.message));
      navigate("/admin-login");
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.message));
      //   console.log("Error", error);
    },
  });

  return (
    <>
      <Box className='flex flex-col items-center justify-center'>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            mobile: "",
            email: "",
            password: "",
            conformPassword: "",
          }}
          validationSchema={registerAdminValidationSchema}
          onSubmit={(values, { resetForm }) => {
            const finalPassword = values.conformPassword;
            values.password = finalPassword;
            mutate(values, {
              onSuccess: () => {
                // Reset form after successful submission
                resetForm();
              },
            });
          }}
        >
          {(formik) => (
            <form
              className='flex flex-col w-1/3 h-auto gap-2 p-3 mt-10 mb-10 rounded-lg shadow-xl min-w-fit bg-gradient-to-r from-blue-40 shadow-blue-500/50'
              onSubmit={formik.handleSubmit}
            >
              {isPending && <LinearProgress color='primary' />}

              <Typography variant='h4' className='text-[#1976D2]'>
                Admin Registration
              </Typography>

              <Box className='flex flex-row gap-1'>
                {/*//*==== firstName======*/}
                <FormControl className='w-1/2'>
                  <TextField
                    label='First Name'
                    required
                    {...formik.getFieldProps("firstName")}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <FormHelperText error>
                      {formik.errors.firstName}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                {/*//*==== lastName======*/}
                <FormControl className='w-1/2'>
                  <TextField
                    label='Last Name'
                    required
                    {...formik.getFieldProps("lastName")}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <FormHelperText error>
                      {formik.errors.lastName}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Box>
              {/*//*==== Mobile======*/}

              <FormControl>
                <TextField
                  label='Mobile Number'
                  required
                  type='tel'
                  {...formik.getFieldProps("mobile")}
                />
                {formik.touched.mobile && formik.errors.mobile ? (
                  <FormHelperText error>{formik.errors.mobile}</FormHelperText>
                ) : null}
              </FormControl>
              {/*//*==== Email======*/}

              <FormControl>
                <TextField
                  label='Email'
                  required
                  type='email'
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <FormHelperText error>{formik.errors.email}</FormHelperText>
                ) : null}
              </FormControl>

              {/*//*==== password======*/}

              <FormControl>
                <TextField
                  label='Password'
                  required
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <FormHelperText error>
                    {formik.errors.password}
                  </FormHelperText>
                ) : null}
              </FormControl>

              {/*//*==== Conform Password======*/}

              <FormControl>
                <TextField
                  label='Conform Password'
                  required
                  {...formik.getFieldProps("conformPassword")}
                />
                {formik.touched.conformPassword &&
                formik.errors.conformPassword ? (
                  <FormHelperText error>
                    {formik.errors.conformPassword}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <Button
                variant='contained'
                color='secondary'
                type='submit'
                disabled={isPending}
              >
                Register
              </Button>
              <Link to='/admin-login'>
                <Typography variant='h6' className='text-blue-600'>
                  Already Registered? Login
                </Typography>
              </Link>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default AdminRegister;
