import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // TEMP AUTH CHECK (later backend se replace karna)
  const isAuthenticated = true; // false karoge to login pe redirect hoga

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
