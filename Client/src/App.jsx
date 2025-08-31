import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import TechnicianUpload from "./pages/TechnicianUpload/TechnicianUpload";
import DentistViewer from "./pages/DentistViewer/DentistViewer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import RoleRoute from "./components/RoleRoute/RoleRoute";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <RoleRoute requiredRole="technician">
              <TechnicianUpload />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/viewer"
        element={
          <ProtectedRoute>
            <RoleRoute requiredRole="dentist">
              <DentistViewer />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<div className="not-found">Page not found</div>}
      />
    </Routes>
  );
};

export default App;
