import React, { ReactNode } from "react";
import { Navigate } from "react-router";
import { appRouting } from "@/app/config";
import { useAuthContext } from "../providers/auth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuthContext();

  return user ? <>{children}</> : <Navigate to={appRouting.auth.path} />;
};

export default ProtectedRoute;
