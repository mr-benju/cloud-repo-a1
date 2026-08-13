package com.diagnostico.incidencias_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diagnostico.incidencias_backend.model.Estado;
import com.diagnostico.incidencias_backend.model.Incidencia;
import com.diagnostico.incidencias_backend.model.Prioridad;

@Repository
public interface IncidenciaRepository extends JpaRepository<Incidencia, Long> {
    List<Incidencia> findByEstado(Estado estado);
    List<Incidencia> findByPrioridad(Prioridad prioridad);
    List<Incidencia> findByTituloContainingIgnoreCase(String titulo);

    long countByEstado(Estado estado);
}