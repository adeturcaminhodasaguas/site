package br.com.rodrigofroes.backend.DTO.response;

import java.util.UUID;

public record UsuarioResponse(
    UUID id,
    String nome,
    String email,
    String status,
    String tipo
) {}