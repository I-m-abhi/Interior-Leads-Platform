import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardHome from "./dashboard/DashBoardHome";
import LeadsPage from "./pages/LeadsPage";
import CreateLead from "./dashboard/CreateLead";
import LeadDetailsPage from "./pages/LeadDetailsPage";
import UsersPage from "./pages/UsersPage";
import SettingPage from "./pages/SettingPage";
import Unauthorized from "./pages/Unauthorized";
import { useAuthStore } from "./store/authStore";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>),
      children: [
        { index: true, element: <DashboardHome /> },
        { path: "leads", element: <LeadsPage /> },
        { path: "lead/create", element: <CreateLead /> },
        { path: "lead/:id", element: <LeadDetailsPage /> },
        { path: "users", element: <UsersPage /> },
        { path: "settings", element: <SettingPage /> },
      ]
    },
    {
      path: "/unauthorized",
      element: <Unauthorized />
    }
  ])
  const { checkingAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkingAuth();
  }, []);

  if (isCheckingAuth) {
    return <h2>Loading App ...</h2>;
  }

  return <RouterProvider router={router} />;
};

export default App;