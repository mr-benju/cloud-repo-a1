package com.diagnostico.incidencias_backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.diagnostico.incidencias_backend.dto.IncidenciaDTO;
import com.diagnostico.incidencias_backend.model.Estado;
import com.diagnostico.incidencias_backend.model.Incidencia;
import com.diagnostico.incidencias_backend.model.Prioridad;
import com.diagnostico.incidencias_backend.service.IncidenciaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/incidencias")
@CrossOrigin(origins = "*")
public class IncidenciaController {

    private final IncidenciaService service;

    public IncidenciaController(IncidenciaService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Incidencia>> listar(
            @RequestParam(required = false) Estado estado,
            @RequestParam(required = false) Prioridad prioridad,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(service.obtenerTodas(estado, prioridad, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Incidencia> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.obtenerPorId(id));
    }

    @PostMapping
    public ResponseEntity<Incidencia> crear(@Valid @RequestBody IncidenciaDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Incidencia> actualizar(@PathVariable Long id, @Valid @RequestBody IncidenciaDTO dto) {
        return ResponseEntity.ok(service.actualizar(id, dto));
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<Incidencia> cambiarEstado(@PathVariable Long id, @RequestParam Estado estado) {
        return ResponseEntity.ok(service.cambiarEstado(id, estado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/contadores")
    public ResponseEntity<Map<String, Long>> contadores() {
        return ResponseEntity.ok(service.obtenerContadores());
    }
}