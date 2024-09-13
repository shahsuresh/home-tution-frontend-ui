import React from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import $axios from "../lib/axios/axios.instance";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbarSlice";
import { studentDataValidationSchema } from "../validationSchema/request.tution.validation.schema";
const RequestTutionForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //?=== hit register api =======
  const { isPending, mutate } = useMutation({
    mutationKey: ["request-tution"],
    mutationFn: async (values) => {
      return await $axios.post("/student/request", values);
    },
    onSuccess: (res) => {
      dispatch(openSuccessSnackbar(res?.data?.message));
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
            class: "",
            subjects: "",
            timing: "",
            city: "",
            area: "",
          }}
          validationSchema={studentDataValidationSchema}
          onSubmit={(values, { resetForm }) => {
            const subjectsArray = values.subjects
              .split(",")
              .map((subject) => subject.trim());
            values.subjects = subjectsArray;
            mutate(values, {
              onSuccess: () => {
                // Reset form after successful submission
                resetForm();
                console.log("Submitted");
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
                Request for new Tuition Class
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
              {/*//*==== Subjects======*/}

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
                {/*//*==== Class======*/}

                <FormControl className='w-1/2'>
                  <InputLabel>Class</InputLabel>
                  <Select label='Degree' {...formik.getFieldProps("class")}>
                    <MenuItem value='1'>1</MenuItem>
                    <MenuItem value='2'>2</MenuItem>
                    <MenuItem value='3'>3</MenuItem>
                    <MenuItem value='4'>4</MenuItem>
                    <MenuItem value='5'>5</MenuItem>
                    <MenuItem value='6'>6</MenuItem>
                    <MenuItem value='7'>7</MenuItem>
                    <MenuItem value='8'>8</MenuItem>
                    <MenuItem value='9'>9</MenuItem>
                    <MenuItem value='10'>10</MenuItem>
                    <MenuItem value='11'>11</MenuItem>
                    <MenuItem value='12'>12</MenuItem>
                    <MenuItem value='Bachelor'>Bachelor</MenuItem>
                  </Select>

                  {formik.touched.class && formik.errors.class ? (
                    <FormHelperText error>{formik.errors.class}</FormHelperText>
                  ) : null}
                </FormControl>
                {/*//*==== Time======*/}

                <FormControl className='w-1/2'>
                  <InputLabel>Timing</InputLabel>
                  <Select label='Timing' {...formik.getFieldProps("timing")}>
                    <MenuItem value='Morning' selected='true'>
                      Morning
                    </MenuItem>
                    <MenuItem value='Day'>Day</MenuItem>
                    <MenuItem value='Evening'>Evening</MenuItem>
                  </Select>

                  {formik.touched.timing && formik.errors.timing ? (
                    <FormHelperText error>
                      {formik.errors.timing}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Box>

              <Box className='flex flex-row gap-1'>
                {/*//*==== City======*/}

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
                {/*//*==== Area======*/}

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
                Request
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default RequestTutionForm;
