package br.com.rodrigofroes.backend.DTO.response;

public record AutenticacaoResponse(
        String token,
        UsuarioResponse usuario
) {}
