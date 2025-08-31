import { Navigate } from "react-router-dom";
import { getAuth } from "../../utils/auth";

const ProtectedRoute = ({ children }) => {
  const { token } = getAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
