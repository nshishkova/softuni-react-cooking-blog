import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/useAuth";

// Only logged-in users can see the nested routes, guests are sent to Login
export default function AuthGuard() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
