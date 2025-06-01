
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Plus, History, User } from 'lucide-react';
import Navigation from '@/components/Navigation';

const ClienteDashboard: React.FC = () => {
  const { userProfile } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            ¡Hola, {userProfile?.nombre}!
          </h1>
          <p className="text-gray-600 mt-2">
            Encuentra el profesional perfecto para tu proyecto
          </p>
        </div>

        {/* Acciones rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Search className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Buscar Profesionales</h3>
              <p className="text-sm text-gray-600 mb-4">
                Encuentra albañiles por especialidad y zona
              </p>
              <Button className="w-full">Buscar</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Plus className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Solicitar Trabajo</h3>
              <p className="text-sm text-gray-600 mb-4">
                Publica tu proyecto y recibe ofertas
              </p>
              <Button variant="outline" className="w-full">Publicar</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <History className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Mis Trabajos</h3>
              <p className="text-sm text-gray-600 mb-4">
                Revisa el estado de tus proyectos
              </p>
              <Button variant="outline" className="w-full">Ver Historial</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <User className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Mi Perfil</h3>
              <p className="text-sm text-gray-600 mb-4">
                Actualiza tu información personal
              </p>
              <Button variant="outline" className="w-full">Editar</Button>
            </CardContent>
          </Card>
        </div>

        {/* Trabajos recientes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Trabajos Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-500">No tienes trabajos recientes</p>
                <Button className="mt-4">Solicitar Primer Trabajo</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profesionales Recomendados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-500">Busca profesionales para ver recomendaciones</p>
                <Button variant="outline" className="mt-4">Explorar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClienteDashboard;
