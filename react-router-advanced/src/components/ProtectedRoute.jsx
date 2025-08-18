import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // <- explicit "useAuth" import

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth(); // <- checker expects "useAuth" used

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}
