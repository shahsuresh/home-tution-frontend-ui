import AddTutionPost from "../components/AddTutionPost";
import AdminProfileUpdate from "../components/AdminProfileUpdate";
import UpdateAdminPassword from "../components/UpdateAdminPassword";
import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import AdminDashboard from "../pages/AdminDashboard";
import AdminProfile from "../pages/AdminProfile";
import AdminRegister from "../pages/AdminRegister";
import Home from "../pages/Home";
import LoginAdmin from "../pages/LoginAdmin";
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
      {
        path: "admin-register",
        element: <AdminRegister />,
      },
      {
        path: "admin-login",
        element: <LoginAdmin />,
      },
      {
        path: "admin-dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "admin-profile",
        element: <AdminProfile />,
      },
      {
        path: "admin-profile-update",
        element: <AdminProfileUpdate />,
      },
      {
        path: "admin-password-update",
        element: <UpdateAdminPassword />,
      },
    ],
  },
];

export default mainRoutes;
