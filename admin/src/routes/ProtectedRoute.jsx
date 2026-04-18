import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "admin") {
    // toast.error(`Access denied for role: ${user.role}`)
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;