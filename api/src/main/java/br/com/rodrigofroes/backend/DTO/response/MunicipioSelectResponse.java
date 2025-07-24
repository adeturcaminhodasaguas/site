package br.com.rodrigofroes.backend.DTO.response;

import java.util.UUID;

public record MunicipioSelectResponse(
    UUID id,
    String nome
) {}
