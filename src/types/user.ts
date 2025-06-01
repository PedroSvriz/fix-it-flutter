
export type UserRole = 'cliente' | 'albañil';

export type Especialidad = 
  | 'Electricista'
  | 'Gasista'
  | 'Plomero'
  | 'Pintor'
  | 'Carpintero'
  | 'Albañil'
  | 'Techista'
  | 'Herrería'
  | 'Otros';

export interface BaseUser {
  uid: string;
  email: string;
  nombre: string;
  telefono: string;
  role: UserRole;
  createdAt: Date;
}

export interface Cliente extends BaseUser {
  role: 'cliente';
}

export interface Albañil extends BaseUser {
  role: 'albañil';
  especialidad: Especialidad;
  zonasTrabajo: string[];
  experiencia: number; // años
  dni: string;
  fotoUrl?: string;
  calificacion?: number;
  trabajosCompletados?: number;
  descripcion?: string;
}

export type User = Cliente | Albañil;
