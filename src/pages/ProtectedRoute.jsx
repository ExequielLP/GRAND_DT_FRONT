import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";

const ProtectedRoute = ({children,redirectTo}) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Si NO está logueado → lo mandamos al login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo || "/login"} replace />;
  }

  // Si está logueado → renderiza la ruta hija
  return <Outlet />;
};

export default ProtectedRoute;

