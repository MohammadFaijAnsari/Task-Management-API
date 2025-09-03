import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authcontext";

function AdminRoute({ children }) {
  const { isLoggedIn, loading, user } = useContext(AuthContext);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Checking login...</div>;
  }

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (!user || user.role !== "Admin") return <Navigate to="/" replace />; // redirect normal users

  return children;
}

export default AdminRoute;
