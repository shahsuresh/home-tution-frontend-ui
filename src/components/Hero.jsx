import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className='flex items-center justify-center h-screen bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-500 '>
      {/* bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-300 */}
      {/* bg-gradient-to-r from-indigo-400 to-cyan-400 */}
      {/* bg-gradient-to-r from-cyan-500 to-blue-500 */}
      <div className='text-center'>
        <h1 className='mb-4 text-5xl font-bold text-white'>
          Connecting Students and Teachers for Home Tuition
        </h1>
        <p className='mb-8 text-xl text-white'>
          "Find the perfect tutor for personalized learning or offer your
          teaching expertise to eager students.
          <p className='mb-8 text-xl text-white'>
            Bridging the gap for a better learning experience."
          </p>
          {/* Find qualified teachers or request tuition
          sessions with ease! */}
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
            sx={{ border: "2px solid white", color: "greenyellow" }}
            variant='outlined'
            className=' hover:text-white'
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
