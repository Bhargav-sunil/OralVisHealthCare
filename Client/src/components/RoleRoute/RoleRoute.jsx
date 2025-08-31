import { Navigate } from "react-router-dom";
import { getAuth } from "../../utils/auth";

const RoleRoute = ({ requiredRole, children }) => {
  const { user } = getAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== requiredRole) return <Navigate to="/" replace />;
  return children;
};

export default RoleRoute;
