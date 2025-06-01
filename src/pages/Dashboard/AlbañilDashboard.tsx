
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Star, Clock, User, TrendingUp } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Albañil } from '@/types/user';

const AlbañilDashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const albañil = userProfile as Albañil;

  const stats = [
    {
      title: 'Trabajos Completados',
      value: albañil?.trabajosCompletados || 0,
      icon: Briefcase,
      color: 'text-blue-600'
    },
    {
      title: 'Calificación',
      value: albañil?.calificacion ? `${albañil.calificacion.toFixed(1)} ⭐` : 'Sin calificar',
      icon: Star,
      color: 'text-yellow-600'
    },
    {
      title: 'Experiencia',
      value: `${albañil?.experiencia || 0} años`,
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Solicitudes Pendientes',
      value: 0,
      icon: Clock,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                ¡Hola, {albañil?.nombre}!
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">{albañil?.especialidad}</Badge>
                <span className="text-gray-600">
                  Zonas: {albañil?.zonasTrabajo?.join(', ')}
                </span>
              </div>
            </div>
            <Button>
              <User className="w-4 h-4 mr-2" />
              Editar Perfil
            </Button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Secciones principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Solicitudes de Trabajo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No tienes solicitudes pendientes</p>
                <p className="text-sm text-gray-400 mt-2">
                  Las nuevas solicitudes aparecerán aquí
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trabajos en Progreso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No tienes trabajos en progreso</p>
                <p className="text-sm text-gray-400 mt-2">
                  Los trabajos activos se mostrarán aquí
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Perfil rápido */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Mi Perfil Profesional</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Información Básica</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-600">Email:</span> {albañil?.email}</p>
                  <p><span className="text-gray-600">Teléfono:</span> {albañil?.telefono}</p>
                  <p><span className="text-gray-600">DNI:</span> {albañil?.dni}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Descripción</h3>
                <p className="text-sm text-gray-600">
                  {albañil?.descripcion || 'No has agregado una descripción aún'}
                </p>
                {!albañil?.descripcion && (
                  <Button variant="outline" size="sm" className="mt-2">
                    Agregar Descripción
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlbañilDashboard;
