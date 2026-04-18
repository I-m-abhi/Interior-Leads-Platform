import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const PublicRoute = ({ children }) => {
  const { user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null;

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default PublicRoute;