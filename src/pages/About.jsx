import React from "react";
import { Container, Typography, Paper, Box, Stack } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth='lg' sx={{ py: 6 }}>
      <Box textAlign='center' mb={4}>
        <Typography variant='h3' component='h1' gutterBottom>
          About Us
        </Typography>
        <Typography
          variant='body1'
          color='textSecondary'
          maxWidth='md'
          mx='auto'
        >
          We connect students with teachers who offer home tuition services.
          Whether you are seeking help to improve your grades or looking to
          offer your teaching services, we simplify the process for you.
        </Typography>
      </Box>

      <Stack
        spacing={4}
        direction={{ xs: "column", sm: "column", md: "row" }}
        justifyContent='center'
      >
        <Paper elevation={3} sx={{ p: 4, flex: 1 }}>
          <Typography variant='h5' component='h3' gutterBottom>
            Our Mission
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            Our mission is to create a platform where students and teachers can
            connect for home tuition classes. We focus on providing personalized
            academic support through one-on-one interactions.
          </Typography>
        </Paper>

        <Paper elevation={3} sx={{ p: 4, flex: 1 }}>
          <Typography variant='h5' component='h3' gutterBottom>
            Our Vision
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            We envision a world where education is accessible to all. Our
            platform allows teachers to showcase their skills and students to
            find the help they need to succeed in their academic journey.
          </Typography>
        </Paper>
      </Stack>
    </Container>
  );
};

export default About;
