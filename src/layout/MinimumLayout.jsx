import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomSnackbar from "../pages/CustomSnackbar";

const MinimumLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <CustomSnackbar />
      <main className='flex-grow overflow-y-auto'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MinimumLayout;
