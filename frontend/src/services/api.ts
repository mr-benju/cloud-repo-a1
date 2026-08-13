import type { Incidencia, IncidenciaInput, Contadores, Estado } from '../types/incidencia';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/incidencias';

export const api = {
    async obtenerTodas(estado?: string, prioridad?: string, search?: string): Promise<Incidencia[]> {
    const params = new URLSearchParams();
    if (estado) params.append('estado', estado);
    if (prioridad) params.append('prioridad', prioridad);
    if (search) params.append('search', search);

    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE_URL}${query}`);
    if (!res.ok) throw new Error('Error al cargar incidencias');
    return res.json();
},

    async obtenerContadores(): Promise<Contadores> {
    const res = await fetch(`${API_BASE_URL}/contadores`);
    if (!res.ok) throw new Error('Error al obtener contadores');
    return res.json();
},

    async crear(data: IncidenciaInput): Promise<Incidencia> {
    const res = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al crear incidencia');
    return res.json();
},

    async cambiarEstado(id: number, estado: Estado): Promise<Incidencia> {
    const res = await fetch(`${API_BASE_URL}/${id}/estado?estado=${estado}`, {
        method: 'PATCH',
    });
    if (!res.ok) throw new Error('Error al cambiar el estado');
    return res.json();
},

    async eliminar(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error al eliminar incidencia');
},
};