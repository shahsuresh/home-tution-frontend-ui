import { Box, Typography } from "@mui/material";
import React from "react";

const Home = () => {
  console.log(import.meta.env.VITE_MYNAME);
  return (
    <Box>
      My Name is {import.meta.env.VITE_MYNAME}
      <Typography variant='h3'>HOME</Typography>
    </Box>
  );
};

export default Home;
