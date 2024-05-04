import React from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import { useAuth } from "../Context/useAuth";

type Props = { children: React.ReactNode };

const ProtectedRoute = ({ ...props }) => {
  const { isLoggedIn } = useAuth();

  // Redirect unauthenticated users to the login page
  if (!isLoggedIn()) {
    return <Navigate to="/auth/login" replace />;
  }

  // Render the protected route if the user is authenticated
  return <Route {...props} />;
};



export default ProtectedRoute;

// ProtectedRoute for owner-specific routes
export const OwnerProtectedRoute = ({ children }: Props) => {
  const location = useLocation();
  const { isLoggedIn, user } = useAuth();
  const isOwner = user && user.role === 2; // Check if user is an owner
  return isLoggedIn() && isOwner ? (
    <>{children}</>
  ) : (
    <Navigate to="/access-denied" state={{ from: location }} replace /> // Redirect to 403 page for unauthorized access
  );
};
