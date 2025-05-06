// src/components/PrivateRoute.js
import { useAuth } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  return user ? (
    children
  ) : (
    <Navigate to="/loginaws" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
