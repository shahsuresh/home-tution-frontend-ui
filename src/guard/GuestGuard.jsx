import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GuestGuard = (props) => {
  const isUserLoggedIn = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    //if path is "/" and user have not logged in=> navigate to "home" page
    if (pathname === "/" && !isUserLoggedIn) {
      navigate("/home", { replace: true });
    }
    if (isUserLoggedIn && userRole === "teacher") {
      navigate("/teacher-dashboard", { replace: true });
    }
    if (isUserLoggedIn && userRole === "admin") {
      navigate("admin-dashboard");
    }
  }, [navigate, pathname, isUserLoggedIn, userRole]);

  return <>{!isUserLoggedIn && props.children}</>;
};

export default GuestGuard;
