import { Box, Typography } from "@mui/material";
import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";

const Home = () => {
  // console.log(import.meta.env.VITE_MYNAME);
  return (
    <div>
      <Hero />
      <Features />
      <Testimonials />
    </div>
  );
};

export default Home;
