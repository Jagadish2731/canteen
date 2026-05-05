import { Navigate } from "react-router-dom";

// ✅ Blocks access to admin pages if not logged in as admin
export default function ProtectedRoute({ children }) {
  const raw  = localStorage.getItem("user");
  const user = raw ? JSON.parse(raw) : null;

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
