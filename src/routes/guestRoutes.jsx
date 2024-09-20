import GuestGuard from "../guard/GuestGuard";
import MinimumLayout from "../layout/MinimumLayout";
import About from "../pages/About";
import AdminRegister from "../pages/AdminRegister";
import Contact from "../pages/Contact";
import ContactForm from "../pages/ContactForm";
import Home from "../pages/Home";
import Login from "../pages/Login";
import LoginAdmin from "../pages/LoginAdmin";
import Register from "../pages/Register";

const guestRoutes = [
  {
    path: "/",
    element: (
      <GuestGuard>
        <MinimumLayout />,
      </GuestGuard>
    ),
    children: [
      // Public routes (accessible without login)

      {
        path: "home",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },

      {
        path: "contact-student",
        element: <Contact />,
      },
      {
        path: "contactus-form",
        element: <ContactForm />,
      },
      //?======== teacher path for login & register ==========
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      //?======== admin path for login & register  ==========
      {
        path: "admin-register",
        element: <AdminRegister />,
      },
      {
        path: "admin-login",
        element: <LoginAdmin />,
      },
    ],
  },
];

export default guestRoutes;
