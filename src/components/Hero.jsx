import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className='flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-green-300'>
      <div className='text-center'>
        <h1 className='mb-4 text-5xl font-bold text-white'>
          Connecting Students and Teachers for Home Tuition
        </h1>
        <p className='mb-8 text-xl text-white'>
          Find qualified teachers or request tuition sessions with ease!
        </p>
        <div className='flex justify-center space-x-4'>
          <Button
            variant='contained'
            className='text-blue-500 bg-white'
            onClick={() => {
              navigate("/register");
            }}
          >
            Become a Tutor
          </Button>
          <Button
            variant='outlined'
            className='text-white border-white'
            onClick={() => {
              navigate("/contact-student");
            }}
          >
            Post a Tuition Request
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
