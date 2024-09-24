import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from "@tanstack/react-query";
import $axios from "../lib/axios/axios.instance";
import { useNavigate } from "react-router-dom";

const TeacherProfile = () => {
  const navigate = useNavigate();
  // Fetch Teacher profile data from the API
  const { isLoading, error, data } = useQuery({
    queryKey: ["teacher-profile"],
    queryFn: async () => {
      const response = await $axios.get("/teacher/profile");
      return response.data;
    },
  });
  const userData = data?.profileData;

  // Handle loading state
  if (isLoading) {
    return (
      <Box className='flex items-center justify-center min-h-full p-4'>
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Box className='flex items-center justify-center min-h-full p-4 '>
        <Typography className='text-center text-red-600'>
          Error: {error.message}
        </Typography>
      </Box>
    );
  }

  const {
    firstName,
    lastName,
    mobile,
    email,
    degree,
    subjects,
    level,
    city,
    area,
    createdAt,
  } = userData;

  return (
    <Box className='flex items-center justify-center min-h-full p-4 overflow-x-auto font-Playpen_Sans '>
      <Box className='w-full max-w-md p-6 "bg-white  rounded-xl shadow-[0_4px_8px_0_rgba(0,0,255,0.2)] '>
        <Typography
          variant='h4'
          className='py-2 mb-6 font-bold text-center text-white bg-blue-500 rounded'
        >
          Profile
        </Typography>
        <Box className='space-y-4'>
          <Typography className='text-lg'>
            <span className='font-semibold text-blue-600'>Name:</span>{" "}
            {firstName} {lastName}
          </Typography>
          <Typography className='text-lg'>
            <span className='font-semibold text-blue-600'>Mobile No:</span>{" "}
            {mobile}
          </Typography>
          <Typography className='text-lg'>
            <span className='font-semibold text-blue-600'>Email:</span> {email}
          </Typography>
          <Typography className='text-lg'>
            <span className='font-semibold text-blue-600'>Degree:</span>
            {degree}
          </Typography>
          <Typography className='text-lg text-pink-800'>
            <span className='font-semibold text-blue-600'>
              Interested Subjects:
            </span>
            {subjects.join(", ")}
          </Typography>
          <Typography className='text-lg'>
            <span className='font-semibold text-blue-600'>Level:</span> {level}
          </Typography>
          <Typography className='text-lg'>
            <span className='font-semibold text-blue-600'>City:</span> {city}
          </Typography>
          <Typography className='text-lg'>
            <span className='font-semibold text-blue-600'>Area:</span> {area}
          </Typography>
          <Typography className='text-lg'>
            <span className='font-semibold text-blue-600'>User Since:</span>{" "}
            {new Date(createdAt).toLocaleDateString()}
          </Typography>
          <Button
            variant='contained'
            fullWidth
            className='mt-4'
            onClick={() => {
              navigate("/teacher-profile/change-password");
            }}
          >
            Change Password
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TeacherProfile;
