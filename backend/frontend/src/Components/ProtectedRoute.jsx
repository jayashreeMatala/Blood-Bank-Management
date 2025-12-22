import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles = [] }) {
  const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
  const role = localStorage.getItem("role");

  // 1️⃣ Agar login hi nahi hai → login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ Agar roles defined hain aur current role allowed nahi hai → dashboard
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // 3️⃣ Sab sahi → page render
  return children;
}

export default ProtectedRoute;
