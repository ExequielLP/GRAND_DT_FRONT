import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";

const ProtectedRoute = ({ children, redirectTo, requiredRole }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const rol = useAuthStore((state) => state.rol);

  if (!isAuthenticated) return <Navigate to={redirectTo || "/login"} replace />;
  if (requiredRole && rol !== requiredRole) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;

