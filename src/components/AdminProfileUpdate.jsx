import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormHelperText,
  Stack,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useMutation, useQuery } from "@tanstack/react-query";
import $axios from "../lib/axios/axios.instance";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { updateAdminProfileValidationSchema } from "../validationSchema/admin.validation.schema";
import { useDispatch } from "react-redux";
import { openSuccessSnackbar } from "../store/slices/snackbarSlice";

const AdminProfileUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //?======= Fetch Admin profile data from the API=======================
  const { isLoading, error, data } = useQuery({
    queryKey: ["admin-profile-update"],
    queryFn: async () => {
      const response = await $axios.get("/admin/profile");
      return response.data;
    },
  });
  const userData = data?.adminData;

  //?===========API HIT for updating admin data=========================

  const {
    isLoading: isUpdateLoading,
    error: updateError,
    mutate,
  } = useMutation({
    mutationKey: ["update-admin-profile-data"],
    mutationFn: async (values) => {
      return await $axios.put("/admin/profile/edit", values);
    },
    onSuccess: (res) => {
      //   console.log(res?.data?.message);
      dispatch(openSuccessSnackbar(res?.data?.message));
      navigate("/admin-profile");
    },
  });

  //*===================================================================

  // Handle loading state
  if (isLoading || isUpdateLoading) {
    return (
      <Box className='flex items-center justify-center min-h-full p-4'>
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Handle error state
  if (error || updateError) {
    return (
      <Box className='flex items-center justify-center min-h-full p-4 '>
        <Typography className='text-center text-red-600'>
          Error: {error.message}
        </Typography>
      </Box>
    );
  }

  const { firstName, lastName, mobile, email } = userData;
  return (
    <Box className='flex items-center justify-center min-h-full p-4 overflow-x-auto font-Playpen_Sans '>
      <Formik
        initialValues={{
          firstName: firstName,
          lastName: lastName,
          mobile: mobile,
          email: email,
        }}
        validationSchema={updateAdminProfileValidationSchema}
        onSubmit={(values) => {
          mutate(values);
          //   console.log(values);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Box className='w-full max-w-md p-6 "bg-white  rounded-xl shadow-[0_4px_8px_0_rgba(0,0,255,0.2)] '>
              <Typography
                variant='h4'
                className='py-2 mb-6 font-bold text-center text-white bg-blue-500 rounded'
              >
                Profile Edit
              </Typography>
              <Box className='space-y-4'>
                {/* //*==============FIRST NAME=========== */}
                <Stack>
                  <span className='font-semibold text-blue-600'>
                    First Name:
                  </span>
                  <TextField disabled {...formik.getFieldProps("firstName")} />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <FormHelperText error>
                      {formik.errors.firstName}
                    </FormHelperText>
                  ) : null}
                </Stack>
                {/* //*=============LAST NAME============= */}
                <Stack>
                  <span className='font-semibold text-blue-600'>
                    Last Name:
                  </span>
                  <TextField disabled {...formik.getFieldProps("lastName")} />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <FormHelperText error>
                      {formik.errors.lastName}
                    </FormHelperText>
                  ) : null}
                </Stack>
                {/* //*================MOBILE NUMBER===================== */}
                <Stack>
                  <span className='font-semibold text-blue-600'>
                    Mobile No:
                  </span>
                  <TextField {...formik.getFieldProps("mobile")} />
                  {formik.touched.mobile && formik.errors.mobile ? (
                    <FormHelperText error>
                      {formik.errors.mobile}
                    </FormHelperText>
                  ) : null}
                </Stack>
                {/* //*================EMAIL===================== */}
                <Stack>
                  <span className='font-semibold text-blue-600'>Email:</span>
                  <TextField {...formik.getFieldProps("email")} />
                  {formik.touched.email && formik.errors.email ? (
                    <FormHelperText error>{formik.errors.email}</FormHelperText>
                  ) : null}
                </Stack>
                {/* //*================BUTTON===================== */}

                <Box className='flex gap-1'>
                  <Button
                    variant='contained'
                    className='w-1/2 mt-4 '
                    type='submit'
                  >
                    Update Profile
                  </Button>
                  <Button
                    variant='contained'
                    onClick={() => {
                      navigate("/admin-password-update");
                    }}
                    className='w-1/2 mt-4'
                  >
                    Change Password
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AdminProfileUpdate;
