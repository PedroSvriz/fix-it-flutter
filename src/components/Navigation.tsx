
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Home, User, Search, History, LogOut } from 'lucide-react';

const Navigation: React.FC = () => {
  const { userProfile, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-blue-600">AlbañilApp</h1>
            <span className="text-sm text-gray-500 capitalize">
              {userProfile?.role}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Home className="w-4 h-4 mr-2" />
              Inicio
            </Button>
            
            {userProfile?.role === 'cliente' && (
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Button>
            )}
            
            <Button variant="ghost" size="sm">
              <History className="w-4 h-4 mr-2" />
              Historial
            </Button>
            
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4 mr-2" />
              Perfil
            </Button>
            
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
