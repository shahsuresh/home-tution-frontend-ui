import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import CustomSnackbar from "../pages/CustomSnackbar";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <CustomSnackbar />
    </>
  );
};

export default MainLayout;
