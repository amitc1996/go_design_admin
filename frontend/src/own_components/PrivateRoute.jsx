import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "../store/AuthContext";
import Loading from "./Loading";

export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuthState();
  if (loading) return <Loading />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}
