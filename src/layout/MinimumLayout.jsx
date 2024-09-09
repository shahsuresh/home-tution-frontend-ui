import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomSnackbar from "../pages/CustomSnackbar";

const MinimumLayout = () => {
  return (
    <>
      <Header />
      <CustomSnackbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MinimumLayout;
