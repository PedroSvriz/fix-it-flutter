
export type EstadoTrabajo = 
  | 'pendiente'
  | 'aceptado'
  | 'en_progreso'
  | 'completado'
  | 'cancelado';

export interface Trabajo {
  id: string;
  clienteId: string;
  albañilId: string;
  titulo: string;
  descripcion: string;
  especialidadRequerida: string;
  ubicacion: string;
  fechaSolicitud: Date;
  fechaInicio?: Date;
  fechaFinalizacion?: Date;
  estado: EstadoTrabajo;
  precioEstimado?: number;
  calificacion?: {
    puntuacion: number;
    comentario: string;
    fecha: Date;
  };
}
