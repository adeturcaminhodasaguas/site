package br.com.rodrigofroes.backend.DTO.request;

public record AutenticacaoRequest(
    String login,
    String senha
) {}