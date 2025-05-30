import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../features/auth/UserContext";
import { type JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useUser();
  const location = useLocation();

  if (isLoading) return null;
  if (!user) {
    // Endast redirect om användaren försöker gå till en skyddad route utan att vara inloggad
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
