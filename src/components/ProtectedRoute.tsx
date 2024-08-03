import React from "react";
import { Navigate } from "react-router-dom";

// A higher-order component for protecting routes
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Retrieve the token from local storage to check authentication
  const token = localStorage.getItem("token");

  // If no token is found, redirect to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children components (the protected page)
  return <>{children}</>;
};

export default ProtectedRoute;
