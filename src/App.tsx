
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Páginas
import LoginPage from "@/pages/Auth/LoginPage";
import RegisterPage from "@/pages/Auth/RegisterPage";
import ClienteDashboard from "@/pages/Dashboard/ClienteDashboard";
import AlbañilDashboard from "@/pages/Dashboard/AlbañilDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Componente para redirección basada en el rol del usuario
const RoleBasedRedirect = () => {
  const { userProfile } = useAuth();
  
  if (!userProfile) {
    return <Navigate to="/login" replace />;
  }
  
  if (userProfile.role === 'cliente') {
    return <Navigate to="/cliente/dashboard" replace />;
  } else if (userProfile.role === 'albañil') {
    return <Navigate to="/albañil/dashboard" replace />;
  }
  
  return <Navigate to="/login" replace />;
};

// Componente de rutas autenticadas
const AuthenticatedApp = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }
  
  return (
    <Routes>
      <Route path="/" element={<RoleBasedRedirect />} />
      <Route 
        path="/cliente/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['cliente']}>
            <ClienteDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/albañil/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['albañil']}>
            <AlbañilDashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/register" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthenticatedApp />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
