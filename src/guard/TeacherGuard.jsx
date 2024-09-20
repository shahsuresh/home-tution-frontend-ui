import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TeacherGuard = (props) => {
  // Get the accessToken from localStorage

  const isUserLoggedIn = localStorage.getItem("accessToken");

  // Get the user role from localStorage
  const userRole = localStorage.getItem("role");

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    // Define the allowed routes for teachers

    const teacherRoutes = [
      "/teacher-dashboard",
      "/add-tuition",
      "/tution-details/:id",
      "/tution/edit/:id",
      "/teacher-profile",
    ];

    // If the user is not logged in, redirect to login

    if (!isUserLoggedIn) {
      navigate("/home", { replace: true });

      // If the user is a teacher and tries to access a route not in teacherRoutes, redirect to teacher dashboard
    } else if (isUserLoggedIn && userRole === "teacher") {
      // Match dynamic routes too
      const isTeacherRoute = teacherRoutes.some((route) =>
        pathname.includes(route.split(":")[0])
      );
      // Restrict access and redirect
      if (!isTeacherRoute) {
        navigate("/teacher-dashboard", { replace: true });
      }
    }
  }, [isUserLoggedIn, userRole, pathname, navigate]);

  // Render children if the user is logged in and role is 'teacher'
  if (isUserLoggedIn && userRole === "teacher") {
    return props.children;
  }
};

export default TeacherGuard;
