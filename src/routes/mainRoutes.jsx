import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";

const mainRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
];

export default mainRoutes;
