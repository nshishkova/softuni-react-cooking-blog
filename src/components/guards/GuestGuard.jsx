import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/useAuth";

// Only guests can see the nested routes (Login, Register), logged-in users are sent Home
export default function GuestGuard() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
