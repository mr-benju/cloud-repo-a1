import { useState, useEffect } from 'react';
import type { Incidencia, Contadores, Estado, Prioridad } from './types/incidencia';
import { api } from './services/api';
import './index.css';

export default function App() {
  const [incidencias, setIncidencias] = useState<Incidencia[]>([]);
  const [contadores, setContadores] = useState<Contadores>({ ABIERTA: 0, EN_PROGRESO: 0, RESUELTA: 0 });
  const [filtroEstado, setFiltroEstado] = useState<string>('');
  const [busqueda, setBusqueda] = useState<string>('');
  
  const [mostrarModal, setMostrarModal] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [prioridad, setPrioridad] = useState<Prioridad>('MEDIA');

  const cargarDatos = async () => {
    try {
      const data = await api.obtenerTodas(filtroEstado, undefined, busqueda);
      setIncidencias(data);
      const c = await api.obtenerContadores();
      setContadores(c);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [filtroEstado, busqueda]);

  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo || !descripcion) return alert('Título y descripción son obligatorios');
    try {
      await api.crear({ titulo, descripcion, categoria, prioridad });
      setTitulo(''); setDescripcion(''); setCategoria(''); setMostrarModal(false);
      cargarDatos();
    } catch (err) {
      alert('Error al guardar incidencia');
    }
  };

  const handleCambiarEstado = async (id: number, nuevoEstado: Estado) => {
    try {
      await api.cambiarEstado(id, nuevoEstado);
      cargarDatos();
    } catch (err) {
      alert('Error al cambiar el estado');
    }
  };

  const handleEliminar = async (id: number) => {
    if (confirm('¿Eliminar esta incidencia?')) {
      try {
        await api.eliminar(id);
        cargarDatos();
      } catch (err) {
        alert('Error al eliminar');
      }
    }
  };

  return (
    <div className="container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Soporte Técnico - Incidencias</h1>
          <p style={{ margin: 0, color: '#6b7280' }}>Gestión interna de solicitudes y fallas</p>
        </div>
        <button className="btn btn-primary" onClick={() => setMostrarModal(true)}>+ Nueva Incidencia</button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="card" style={{ borderLeft: '4px solid #ef4444' }}>
          <h3 style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>Abiertas</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>{contadores.ABIERTA}</p>
        </div>
        <div className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
          <h3 style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>En Progreso</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>{contadores.EN_PROGRESO}</p>
        </div>
        <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
          <h3 style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>Resueltas</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>{contadores.RESUELTA}</p>
        </div>
      </div>

      <div className="card" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Buscar por título..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
        />
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">Todos los estados</option>
          <option value="ABIERTA">ABIERTA</option>
          <option value="EN_PROGRESO">EN_PROGRESO</option>
          <option value="RESUELTA">RESUELTA</option>
        </select>
      </div>

      <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '0.75rem 1rem' }}>ID</th>
              <th style={{ padding: '0.75rem 1rem' }}>Título</th>
              <th style={{ padding: '0.75rem 1rem' }}>Categoría</th>
              <th style={{ padding: '0.75rem 1rem' }}>Prioridad</th>
              <th style={{ padding: '0.75rem 1rem' }}>Estado</th>
              <th style={{ padding: '0.75rem 1rem' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {incidencias.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
                  No se encontraron incidencias
                </td>
              </tr>
            ) : (
              incidencias.map((inc) => (
                <tr key={inc.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem 1rem' }}>#{inc.id}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <strong>{inc.titulo}</strong>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{inc.descripcion}</div>
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>{inc.categoria || '-'}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>{inc.prioridad}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span className={`badge badge-${inc.estado}`}>{inc.estado}</span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <select
                      value={inc.estado}
                      onChange={(e) => handleCambiarEstado(inc.id, e.target.value as Estado)}
                      style={{ fontSize: '0.8rem', padding: '0.2rem', marginRight: '0.5rem' }}
                    >
                      <option value="ABIERTA">ABIERTA</option>
                      <option value="EN_PROGRESO">EN_PROGRESO</option>
                      <option value="RESUELTA">RESUELTA</option>
                    </select>
                    <button className="btn btn-danger" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }} onClick={() => handleEliminar(inc.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {mostrarModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card" style={{ width: '400px', background: 'white' }}>
            <h2>Nueva Incidencia</h2>
            <form onSubmit={handleCrear}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.3rem' }}>Título *</label>
                <input type="text" style={{ width: '100%', padding: '0.5rem' }} value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.3rem' }}>Descripción *</label>
                <textarea style={{ width: '100%', padding: '0.5rem' }} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.3rem' }}>Categoría</label>
                <input type="text" style={{ width: '100%', padding: '0.5rem' }} value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Ej: Redes, Hardware" />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.3rem' }}>Prioridad</label>
                <select style={{ width: '100%', padding: '0.5rem' }} value={prioridad} onChange={(e) => setPrioridad(e.target.value as Prioridad)}>
                  <option value="BAJA">BAJA</option>
                  <option value="MEDIA">MEDIA</option>
                  <option value="ALTA">ALTA</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setMostrarModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}