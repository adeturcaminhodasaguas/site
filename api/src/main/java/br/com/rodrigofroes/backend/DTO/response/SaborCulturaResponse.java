package br.com.rodrigofroes.backend.DTO.response;

import java.util.UUID;

public record SaborCulturaResponse(
    UUID id,
    String nome,
    String descricao,
    String urlImagem,
    String contato,
    String instagram,
    String site,
    MunicipioResumidoResponse municipio,
    String status
) {}
