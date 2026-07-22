import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import Loader from "../common/Loader";

export default function ProtectedAdminRoute({ children }) {
  const { user, isAdmin, loading } = useAdminAuth();

  if (loading) return <Loader />;

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}