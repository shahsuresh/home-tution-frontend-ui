import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AdminGuard = (props) => {
  const isUserLoggedIn = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    // Define the allowed routes for teachers

    const adminRoutes = [
      "/admin-dashboard",
      "/admin-profile",
      "/admin-profile-update",
      "/admin-password-update",
      "/admin-profile/contact-form-data",
    ];

    // Check if the user is logged in and has the 'admin' role
    if (!isUserLoggedIn || userRole !== "admin") {
      // Redirect to home page if not authenticated or not an admin
      navigate("/home", { replace: true });
      // If the user is a admin and tries to access a route not in adminRoutes, redirect to admin dashboard
    } else if (isUserLoggedIn && userRole === "admin") {
      // Match dynamic routes too
      const isAdminRoute = adminRoutes.some((route) =>
        pathname.includes(route.split(":")[0])
      );
      // Restrict access and redirect
      if (!isAdminRoute) {
        navigate("/admin-dashboard", { replace: true });
      }
    }
  }, [pathname, isUserLoggedIn, navigate, userRole]);

  // Render children only if authenticated and user role is 'admin'
  if (isUserLoggedIn && userRole === "admin") {
    return props.children;
  }
};

export default AdminGuard;
