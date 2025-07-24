package br.com.rodrigofroes.backend.DTO.response;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

public record EventoResponse(
        UUID id,
        String nome,
        String descricao,
        LocalDate  data,
        LocalTime horaInicio,
        LocalTime horaFim,
        String local,
        String urlImagem,
        String categoria,
        Boolean destaque,
        String status,
        MunicipioResumidoResponse municipio
) {}
