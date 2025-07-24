package br.com.rodrigofroes.backend.DTO.request;

import java.util.UUID;

import jakarta.annotation.Nullable;

public record UsuarioRequest(
    @Nullable UUID id,
    String nome,
    String email,
    String senha
) {}