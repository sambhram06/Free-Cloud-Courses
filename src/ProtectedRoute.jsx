import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredProvider }) => {
  const authProvider = localStorage.getItem('authProvider');

  if (authProvider !== requiredProvider) {
    return <Navigate to="/loginaws" replace />;
  }

  return children;
};

export default ProtectedRoute;
