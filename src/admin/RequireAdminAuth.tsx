import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthContext";

export default function RequireAdminAuth() {
  const { session, loading } = useAdminAuth();
  if (loading) return null;
  return session ? <Outlet /> : <Navigate to="/admin/login" replace />;
}