package br.com.rodrigofroes.backend.DTO.request;

import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

public record TurismoExperienciaRequest(
    UUID id,
    String nome,
    String descricao,
    MultipartFile imagem,
    String contato,
    String instagram,
    String site,
    UUID municipioId
) {}