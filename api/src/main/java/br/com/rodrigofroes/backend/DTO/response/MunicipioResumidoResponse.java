package br.com.rodrigofroes.backend.DTO.response;

import java.util.UUID;

public record MunicipioResumidoResponse(
        UUID id,
        String nome
) {}