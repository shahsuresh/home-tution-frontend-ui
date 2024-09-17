import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerTeacherValidationSchema } from "../validationSchema/teacher.login.validation.schema";
import { useMutation } from "@tanstack/react-query";
import $axios from "../lib/axios/axios.instance";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbarSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //?=== hit register api =======
  const { isPending, mutate } = useMutation({
    mutationKey: ["register-teacher"],
    mutationFn: async (values) => {
      return await $axios.post("/teacher/register", values);
    },
    onSuccess: (res) => {
      dispatch(openSuccessSnackbar(res?.data?.message));
      console.log(res.data.message);
      navigate("/login");
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.message));
      console.log("Error", error);
    },
  });
  return (
    <>
      <Box className='flex flex-col items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-cyan-200'>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            mobile: "",
            email: "",
            password: "",
            degree: "",
            subjects: "",
            level: "",
            city: "",
            area: "",
          }}
          validationSchema={registerTeacherValidationSchema}
          onSubmit={(values) => {
            const subjectsArray = values.subjects
              .split(",")
              .map((subject) => subject.trim());
            values.subjects = subjectsArray;
            mutate(values);
          }}
        >
          {(formik) => (
            <form
              className='flex flex-col w-1/3 h-auto gap-2 p-3 mt-10 mb-10 rounded-lg shadow-xl min-w-fit bg-gradient-to-r from-blue-40 shadow-blue-500/50'
              onSubmit={formik.handleSubmit}
            >
              {isPending && <LinearProgress color='primary' />}

              <Typography variant='h4' className='text-[#1976D2]'>
                Sign up
              </Typography>

              <Box className='flex flex-row gap-1'>
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

              <FormControl>
                <TextField
                  type='password'
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

              <Box className='flex flex-row gap-1'>
                <FormControl className='w-1/2'>
                  <InputLabel>Your Degree</InputLabel>
                  <Select label='Degree' {...formik.getFieldProps("degree")}>
                    <MenuItem value='+2'>+2</MenuItem>
                    <MenuItem value='Bachelor'>Bachelor</MenuItem>
                    <MenuItem value='Master'>Master</MenuItem>
                    <MenuItem value='PHD'>PHD</MenuItem>
                  </Select>

                  {formik.touched.degree && formik.errors.degree ? (
                    <FormHelperText error>
                      {formik.errors.degree}
                    </FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl className='w-1/2'>
                  <InputLabel>
                    For which level of student you want to teach
                  </InputLabel>
                  <Select label='Level' {...formik.getFieldProps("level")}>
                    <MenuItem value='SEE'>SEE</MenuItem>
                    <MenuItem value='+2'>+2</MenuItem>
                    <MenuItem value='Bachelor'>Bachelor</MenuItem>
                  </Select>

                  {formik.touched.level && formik.errors.level ? (
                    <FormHelperText error>{formik.errors.level}</FormHelperText>
                  ) : null}
                </FormControl>
              </Box>

              <FormControl>
                <TextField
                  label='Subjects(comma-separated)'
                  required
                  {...formik.getFieldProps("subjects")}
                />
                {formik.touched.subjects && formik.errors.subjects ? (
                  <FormHelperText error>
                    {formik.errors.subjects}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <Box className='flex flex-row gap-1'>
                <FormControl className='w-1/2'>
                  <TextField
                    label='City'
                    required
                    {...formik.getFieldProps("city")}
                  />
                  {formik.touched.city && formik.errors.city ? (
                    <FormHelperText error>{formik.errors.city}</FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl className='w-1/2'>
                  <TextField
                    label='Area'
                    required
                    {...formik.getFieldProps("area")}
                  />
                  {formik.touched.area && formik.errors.area ? (
                    <FormHelperText error>{formik.errors.area}</FormHelperText>
                  ) : null}
                </FormControl>
              </Box>

              <Button
                variant='contained'
                color='secondary'
                type='submit'
                disabled={isPending}
              >
                Register
              </Button>

              <Link to='/login'>
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

export default Register;
