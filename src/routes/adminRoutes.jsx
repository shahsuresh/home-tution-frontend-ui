import AdminProfileUpdate from "../components/AdminProfileUpdate";
import UpdateAdminPassword from "../components/UpdateAdminPassword";
import AdminGuard from "../guard/AdminGuard";
import MainLayout from "../layout/MainLayout";
import AdminDashboard from "../pages/AdminDashboard";
import AdminProfile from "../pages/AdminProfile";
import AdminRegister from "../pages/AdminRegister";
import ContactFormData from "../pages/ContactFormData";
import LoginAdmin from "../pages/LoginAdmin";

const adminRoutes = [
  //   // Public routes (accessible without login)
  //   {
  //     path: "admin-register",
  //     element: <AdminRegister />,
  //   },
  //   {
  //     path: "admin-login",
  //     element: <LoginAdmin />,
  //   },

  // Protected routes (only accessible if logged in)
  {
    path: "/",
    element: (
      <AdminGuard>
        <MainLayout />
      </AdminGuard>
    ),
    children: [
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
      {
        path: "admin-profile/contact-form-data",
        element: <ContactFormData />,
      },
    ],
  },
];

export default adminRoutes;
