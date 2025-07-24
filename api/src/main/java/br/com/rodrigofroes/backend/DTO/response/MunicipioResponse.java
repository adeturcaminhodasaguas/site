package br.com.rodrigofroes.backend.DTO.response;

import java.util.List;
import java.util.UUID;

public record MunicipioResponse(
    UUID id,
    String nome,
    String descricao,
    String brasao,
    List<String> destaque,
    String instagram,
    String site,
    String contato,
    String status
) {}