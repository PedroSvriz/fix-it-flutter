
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { currentUser, userProfile } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (userProfile?.role === 'cliente') {
    return <Navigate to="/cliente/dashboard" replace />;
  } else if (userProfile?.role === 'albañil') {
    return <Navigate to="/albañil/dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default Index;
