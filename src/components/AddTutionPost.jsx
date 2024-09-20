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
import { addTutionValidationSchema } from "../validationSchema/addTutionValidationSchema";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import $axios from "../lib/axios/axios.instance";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbarSlice";

const AddTutionPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //?=== hit add tution api =======

  const { isPending, mutate } = useMutation({
    mutationKey: ["add-tution-post"],
    mutationFn: async (values) => {
      return await $axios.post("/tution/add", values);
    },
    onSuccess: (res) => {
      dispatch(openSuccessSnackbar(res?.data?.message));
      navigate("/teacher-dashboard");
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.data?.message));
      console.log(error);
    },
  });
  return (
    <>
      <Box className='flex flex-col items-center justify-center'>
        <Formik
          initialValues={{
            name: "",
            subjects: "",
            forClass: "",
            price: "",
            priceType: "",
            // status: "",
          }}
          validationSchema={addTutionValidationSchema}
          onSubmit={(values) => {
            const subjectsArray = values.subjects
              .split(",")
              .map((subject) => subject.trim());
            values.subjects = subjectsArray;
            // console.log(values);
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
                Add Tuition
              </Typography>
              {/* //?============name================== */}
              <FormControl>
                <TextField
                  label='Tuition Name'
                  required
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <FormHelperText error>{formik.errors.name}</FormHelperText>
                ) : null}
              </FormControl>
              {/* //?=============subjects============== */}
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
              {/* //?=============price================= */}
              <FormControl>
                <TextField
                  label='Price'
                  required
                  type='tel'
                  {...formik.getFieldProps("price")}
                />
                {formik.touched.price && formik.errors.price ? (
                  <FormHelperText error>{formik.errors.price}</FormHelperText>
                ) : null}
              </FormControl>
              {/* //?=============forClass================= */}
              <FormControl>
                <InputLabel>
                  For Which class of students you want to teach
                </InputLabel>
                <Select label='Class' {...formik.getFieldProps("forClass")}>
                  <MenuItem value='Primary'>Primary</MenuItem>
                  <MenuItem value='Lower Secondary'>Lower Secondary</MenuItem>
                  <MenuItem value='Secondary'>Secondary</MenuItem>
                  <MenuItem value='+2-11th'>+2-11th</MenuItem>
                  <MenuItem value='+2-12th'>+2-12th</MenuItem>
                  <MenuItem value='Bachelor'>Bachelor</MenuItem>
                </Select>

                {formik.touched.forClass && formik.errors.forClass ? (
                  <FormHelperText error>
                    {formik.errors.forClass}
                  </FormHelperText>
                ) : null}
              </FormControl>
              {/* //?=============priceType================= */}
              <FormControl>
                <InputLabel>Price Type</InputLabel>
                <Select
                  label='price Type'
                  {...formik.getFieldProps("priceType")}
                  required
                >
                  <MenuItem value='hourly'>Hourly</MenuItem>
                  <MenuItem value='monthly' selected={true}>
                    Monthly
                  </MenuItem>
                </Select>

                {formik.touched.priceType && formik.errors.priceType ? (
                  <FormHelperText error>
                    {formik.errors.priceType}
                  </FormHelperText>
                ) : null}
              </FormControl>
              {/* //?=============status================= */}
              {/* <FormControl className='w-1/2'>
                <InputLabel>Status</InputLabel>
                <Select label='Status' {...formik.getFieldProps("status")}>
                  <MenuItem value='Pending' selected>
                    Pending
                  </MenuItem>
                  <MenuItem value='Completed'>Completed</MenuItem>
                </Select>

                {formik.touched.status && formik.errors.status ? (
                  <FormHelperText error>{formik.errors.status}</FormHelperText>
                ) : null}
              </FormControl> */}
              <Button
                variant='contained'
                color='secondary'
                type='submit'
                disabled={isPending}
              >
                Add
              </Button>
              <Link to='/teacher-dashboard'>
                <Typography
                  variant='h6'
                  className='float-right p-1 text-blue-600 border-2 border-blue-400'
                >
                  Go to your Dashboard
                </Typography>
              </Link>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default AddTutionPost;
