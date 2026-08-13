package com.diagnostico.incidencias_backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.diagnostico.incidencias_backend.dto.IncidenciaDTO;
import com.diagnostico.incidencias_backend.model.Estado;
import com.diagnostico.incidencias_backend.model.Incidencia;
import com.diagnostico.incidencias_backend.model.Prioridad;
import com.diagnostico.incidencias_backend.repository.IncidenciaRepository;

@Service
public class IncidenciaService {

    private final IncidenciaRepository repository;

    public IncidenciaService(IncidenciaRepository repository) {
        this.repository = repository;
    }

    public List<Incidencia> obtenerTodas(Estado estado, Prioridad prioridad, String search) {
        if (estado != null) return repository.findByEstado(estado);
        if (prioridad != null) return repository.findByPrioridad(prioridad);
        if (search != null && !search.isBlank()) return repository.findByTituloContainingIgnoreCase(search);
        return repository.findAll();
    }

    public Incidencia obtenerPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Incidencia no encontrada con ID: " + id));
    }

    public Incidencia crear(IncidenciaDTO dto) {
        Incidencia incidencia = Incidencia.builder()
                .titulo(dto.getTitulo())
                .descripcion(dto.getDescripcion())
                .categoria(dto.getCategoria())
                .prioridad(dto.getPrioridad())
                .estado(dto.getEstado() != null ? dto.getEstado() : Estado.ABIERTA)
                .build();
        return repository.save(incidencia);
    }

    public Incidencia actualizar(Long id, IncidenciaDTO dto) {
        Incidencia existente = obtenerPorId(id);
        existente.setTitulo(dto.getTitulo());
        existente.setDescripcion(dto.getDescripcion());
        existente.setCategoria(dto.getCategoria());
        existente.setPrioridad(dto.getPrioridad());
        if (dto.getEstado() != null) {
            existente.setEstado(dto.getEstado());
        }
        return repository.save(existente);
    }

    public Incidencia cambiarEstado(Long id, Estado nuevoEstado) {
        Incidencia existente = obtenerPorId(id);
        existente.setEstado(nuevoEstado);
        return repository.save(existente);
    }

    public void eliminar(Long id) {
        Incidencia existente = obtenerPorId(id);
        repository.delete(existente);
    }

    public Map<String, Long> obtenerContadores() {
        Map<String, Long> contadores = new HashMap<>();
        contadores.put("ABIERTA", repository.countByEstado(Estado.ABIERTA));
        contadores.put("EN_PROGRESO", repository.countByEstado(Estado.EN_PROGRESO));
        contadores.put("RESUELTA", repository.countByEstado(Estado.RESUELTA));
        return contadores;
    }
}