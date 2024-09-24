import AddTutionPost from "../components/AddTutionPost";
import ChangeTeacherPassword from "../components/ChangeTeacherPassword";
import TeacherGuard from "../guard/TeacherGuard";
import MainLayout from "../layout/MainLayout";
import TeacherDashboard from "../pages/TeacherDashboard";
import TeacherProfile from "../pages/TeacherProfile";
import TutionDetailsPage from "../pages/TutionDetailsPage";
import TutionEditPage from "../pages/TutionEditPage";

const teacherRoutes = [
  {
    path: "/",
    element: (
      <TeacherGuard>
        <MainLayout />
      </TeacherGuard>
    ),
    children: [
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
        path: "teacher-profile/change-password",
        element: <ChangeTeacherPassword />,
      },
    ],
  },
];

export default teacherRoutes;
