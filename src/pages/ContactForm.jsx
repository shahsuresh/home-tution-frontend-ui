import React from "react";
import { Formik, Form, Field } from "formik";
import {
  TextField,
  Button,
  Stack,
  IconButton,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import contactFormValidationSchema from "../validationSchema/contact.form.validation.schema";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import $axios from "../lib/axios/axios.instance";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbarSlice";

//*==== Styled component for the input fields to add shadows and transitions
const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    transition: "box-shadow 0.3s ease-in-out",
    "&:hover fieldset": {
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    },
    "&.Mui-focused fieldset": {
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
    },
  },
});

const ContactForm = () => {
  // *======= api hit to send form data to database ======================
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isPending, error, mutate } = useMutation({
    mutationKey: ["get-contact-us-form-data"],
    mutationFn: async (values) => {
      return await $axios.post("/visitor-data", values);
    },
    onSuccess: (res) => {
      dispatch(
        openSuccessSnackbar(
          "Your message is received. We will get back to you soon"
        )
      );
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error.message));
    },
  });

  if (error) {
    return window.alert(error);
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 md:flex-row'>
      {/* //*================* Left side "Contact Us" section * =======================*/}
      <div className='md:w-1/2 w-full p-8 bg-blue-500 text-white rounded-lg shadow-md h-[630px]'>
        <h2 className='mb-6 text-4xl font-bold text-center'>Contact Us</h2>
        <p className='mb-6 text-2xl text-center'>
          Feel free to reach out to us for any inquiries or assistance.
          <p className='text-center'>We&apos;re here to help!</p>
          <hr />
        </p>
        <p className='text-2xl'>NAMASTE HOME TUITION</p>
        <div className='flex items-center mb-4 text-lg'>
          <EmailIcon className='mr-2 ' />
          <p className='text-xl'>contact@namastehometuition.com</p>
        </div>
        <div className='flex items-center text-xl'>
          <PhoneIcon className='mr-2' />
          <p>+977-9705900600</p>
        </div>

        {/* Social Media Icons */}
        <Stack direction='row' spacing={1}>
          <IconButton
            sx={{ color: "white" }}
            component={Link}
            href='https://www.facebook.com'
            target='_blank'
            rel='noopener'
          >
            <Facebook />
          </IconButton>
          <IconButton
            sx={{ color: "white" }}
            component={Link}
            href='https://www.twitter.com'
            target='_blank'
            rel='noopener'
          >
            <Twitter />
          </IconButton>
          <IconButton
            sx={{ color: "white" }}
            component={Link}
            href='https://www.instagram.com'
            target='_blank'
            rel='noopener'
          >
            <Instagram />
          </IconButton>
          <IconButton
            sx={{ color: "white" }}
            component={Link}
            href='https://www.linkedin.com'
            target='_blank'
            rel='noopener'
          >
            <LinkedIn />
          </IconButton>
        </Stack>
      </div>

      {/* Gap between sections */}
      <div className='w-4'></div>

      {/* //*================* Right side form * =======================*/}
      <div className='md:w-1/2 w-full p-8 bg-white rounded-lg shadow-lg h-[630px]'>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            mobileNo: "",
            subject: "",
            message: "",
          }}
          validationSchema={contactFormValidationSchema}
          onSubmit={(values, { resetForm }) => {
            mutate(values);
            console.log(values);
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form className='space-y-4'>
              {isPending && <LinearProgress color='primary' />}
              <div className='flex space-x-4'>
                <Field
                  name='firstName'
                  as={StyledTextField}
                  fullWidth
                  label='First name'
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
                <Field
                  name='lastName'
                  as={StyledTextField}
                  fullWidth
                  label='Last name'
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </div>
              <Field
                name='email'
                as={StyledTextField}
                fullWidth
                label='Email'
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                name='mobileNo'
                as={StyledTextField}
                fullWidth
                label='Mobile No.'
                error={touched.mobileNo && Boolean(errors.mobileNo)}
                helperText={touched.mobileNo && errors.mobileNo}
              />
              <Field
                name='subject'
                as={StyledTextField}
                fullWidth
                label='Subject'
                error={touched.subject && Boolean(errors.subject)}
                helperText={touched.subject && errors.subject}
              />
              <Field
                name='message'
                as={StyledTextField}
                fullWidth
                multiline
                rows={4}
                label='Message'
                error={touched.message && Boolean(errors.message)}
                helperText={touched.message && errors.message}
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                disabled={isPending}
                className='w-full h-16 mt-5'
                sx={{
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              >
                {isPending ? "Submitting" : "Send message"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactForm;
