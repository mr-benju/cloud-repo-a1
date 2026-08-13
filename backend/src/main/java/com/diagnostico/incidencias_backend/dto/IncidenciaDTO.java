package com.diagnostico.incidencias_backend.dto;

import com.diagnostico.incidencias_backend.model.Estado;
import com.diagnostico.incidencias_backend.model.Prioridad;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class IncidenciaDTO {
    @NotBlank(message = "El título es obligatorio")
    private String titulo;

    @NotBlank(message = "La descripción es obligatoria")
    private String descripcion;

    private String categoria;

    @NotNull(message = "La prioridad es obligatoria")
    private Prioridad prioridad;

    private Estado estado;
}