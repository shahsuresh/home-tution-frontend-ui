import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import CustomSnackbar from "../pages/CustomSnackbar";
import { Box } from "@mui/material";

const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow overflow-y-auto'>
        <Outlet />
      </main>
      <Footer />
      <CustomSnackbar />
    </div>
  );
};

export default MainLayout;
