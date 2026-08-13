export type Prioridad = 'BAJA' | 'MEDIA' | 'ALTA';
export type Estado = 'ABIERTA' | 'EN_PROGRESO' | 'RESUELTA';

export interface Incidencia {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  prioridad: Prioridad;
  estado: Estado;
  fechaCreacion: string;
}

export interface IncidenciaInput {
  titulo: string;
  descripcion: string;
  categoria: string;
  prioridad: Prioridad;
  estado?: Estado;
}

export interface Contadores {
  ABIERTA: number;
  EN_PROGRESO: number;
  RESUELTA: number;
}