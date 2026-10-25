import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

// Explain to the guest why they were sent to the Login page
const getLoginMessage = (pathname) => {
  if (pathname === "/recipes/create") {
    return "Please log in to share a recipe.";
  }

  if (pathname.endsWith("/edit")) {
    return "Please log in to edit a recipe.";
  }

  if (pathname === "/profile") {
    return "Please log in to see your profile.";
  }

  return "Please log in to continue.";
};

// Only logged-in users can see the nested routes, guests are sent to Login
export default function AuthGuard() {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      // The toastId prevents the same message from showing twice
      toast.info(getLoginMessage(pathname), { toastId: "login-required" });
    }
  }, [isAuthenticated, pathname]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
