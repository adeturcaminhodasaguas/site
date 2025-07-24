package br.com.rodrigofroes.backend.DTO.request;

import java.util.List;
import java.util.UUID;

import jakarta.annotation.Nullable;
import org.springframework.web.multipart.MultipartFile;

public record MunicipioRequest(
    @Nullable UUID id,
    String nome,
    String descricao,
    @Nullable MultipartFile brasao,
    @Nullable List<MultipartFile> destaque,
    String instagram,
    String site,
    String contato
) {}
