import React from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Box
      component='footer'
      sx={{
        py: 1,
        px: 1,
        backgroundColor: "#1976D2",
        borderTop: "1px solid #e7e7e7",
        textAlign: "center",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent='space-between'
        alignItems='center'
        spacing={2}
        sx={{ maxWidth: "1200px", margin: "auto" }}
      >
        {/* Copyright */}
        <Typography variant='h6' color='white' sx={{ fontFamily: "monospace" }}>
          &copy; {new Date().getFullYear()} Namaste Home Tuition. All rights
          reserved.
        </Typography>

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

        {/* Contact Link */}

        <Link to='/contact-student'>
          <Typography
            variant='h5'
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "#116bc5",
                textDecoration: "none",
              },
            }}
          >
            Contact Us
          </Typography>
        </Link>
      </Stack>
    </Box>
  );
};

export default Footer;
