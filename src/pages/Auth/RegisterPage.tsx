
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { UserRole, Especialidad } from '@/types/user';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nombre: '',
    telefono: '',
    role: '' as UserRole,
    // Campos específicos para albañil
    especialidad: '' as Especialidad,
    zonasTrabajo: '',
    experiencia: '',
    dni: '',
    descripcion: ''
  });
  
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const especialidades: Especialidad[] = [
    'Electricista', 'Gasista', 'Plomero', 'Pintor', 
    'Carpintero', 'Albañil', 'Techista', 'Herrería', 'Otros'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      const userData: any = {
        nombre: formData.nombre,
        telefono: formData.telefono,
        role: formData.role
      };

      // Agregar campos específicos para albañil
      if (formData.role === 'albañil') {
        userData.especialidad = formData.especialidad;
        userData.zonasTrabajo = formData.zonasTrabajo.split(',').map(z => z.trim());
        userData.experiencia = parseInt(formData.experiencia);
        userData.dni = formData.dni;
        userData.descripcion = formData.descripcion;
        userData.calificacion = 0;
        userData.trabajosCompletados = 0;
      }

      await register(formData.email, formData.password, userData);
      toast.success('¡Registro exitoso!');
    } catch (error: any) {
      console.error('Error al registrarse:', error);
      toast.error('Error al registrarse. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-600">
            Crear Cuenta
          </CardTitle>
          <p className="text-gray-600">Únete a nuestra comunidad</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campos básicos */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirmar</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <Label>Tipo de usuario</Label>
              <Select onValueChange={(value: UserRole) => setFormData({...formData, role: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tu rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cliente">Cliente</SelectItem>
                  <SelectItem value="albañil">Albañil/Profesional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Campos específicos para albañil */}
            {formData.role === 'albañil' && (
              <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800">Información Profesional</h3>
                
                <div>
                  <Label>Especialidad</Label>
                  <Select onValueChange={(value: Especialidad) => setFormData({...formData, especialidad: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tu especialidad" />
                    </SelectTrigger>
                    <SelectContent>
                      {especialidades.map(esp => (
                        <SelectItem key={esp} value={esp}>{esp}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="zonasTrabajo">Zonas de trabajo (separadas por comas)</Label>
                  <Input
                    id="zonasTrabajo"
                    value={formData.zonasTrabajo}
                    onChange={(e) => setFormData({...formData, zonasTrabajo: e.target.value})}
                    placeholder="Ej: Centro, Norte, Sur"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="experiencia">Años de experiencia</Label>
                    <Input
                      id="experiencia"
                      type="number"
                      min="0"
                      value={formData.experiencia}
                      onChange={(e) => setFormData({...formData, experiencia: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="dni">DNI/Cédula</Label>
                    <Input
                      id="dni"
                      value={formData.dni}
                      onChange={(e) => setFormData({...formData, dni: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="descripcion">Descripción (opcional)</Label>
                  <Input
                    id="descripcion"
                    value={formData.descripcion}
                    onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                    placeholder="Cuéntanos sobre tu experiencia..."
                  />
                </div>
              </div>
            )}
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Registrando...' : 'Crear Cuenta'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <a href="/login" className="text-blue-600 hover:underline">
                Inicia sesión aquí
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
