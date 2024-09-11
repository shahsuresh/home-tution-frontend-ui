import AddTutionPost from "../components/AddTutionPost";
import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import Home from "../pages/Home";
import TeacherDashboard from "../pages/TeacherDashboard";
import TeacherProfile from "../pages/TeacherProfile";
import TutionDetailsPage from "../pages/TutionDetailsPage";
import TutionEditPage from "../pages/TutionEditPage";

const mainRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "teacher-dashboard",
        element: <TeacherDashboard />,
      },
      {
        path: "add-tuition",
        element: <AddTutionPost />,
      },
      {
        path: "/tution-details/:id",
        element: <TutionDetailsPage />,
      },
      {
        path: "/tution/edit/:id",
        element: <TutionEditPage />,
      },
      {
        path: "teacher-profile",
        element: <TeacherProfile />,
      },
    ],
  },
];

export default mainRoutes;
