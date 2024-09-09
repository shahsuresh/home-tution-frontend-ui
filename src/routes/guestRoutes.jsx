import MinimumLayout from "../layout/MinimumLayout";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";

const guestRoutes = [
  {
    path: "/",
    element: <MinimumLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "contact-student",
        element: <Contact />,
      },
    ],
  },
];

export default guestRoutes;
