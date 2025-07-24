package br.com.rodrigofroes.backend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import br.com.rodrigofroes.backend.DTO.request.UsuarioRequest;
import br.com.rodrigofroes.backend.DTO.response.UsuarioResponse;
import br.com.rodrigofroes.backend.domain.UsuarioDomain;

public class UsuarioMapper {
    public static UsuarioDomain toDomain(UsuarioRequest request) {
        UsuarioDomain usuarioDomain = new UsuarioDomain();
        usuarioDomain.setNome(request.nome());
        usuarioDomain.setEmail(request.email());
        usuarioDomain.setSenha(request.senha());
        return usuarioDomain;
    }

    public static UsuarioResponse toResponse(UsuarioDomain domain) {
        return new UsuarioResponse(domain.getId(), domain.getNome(), domain.getEmail(), domain.isAtivo() ? "Ativo" : "Inativo", domain.getRole().getDescricao() );
    }

    public static List<UsuarioResponse> toResponseList(List<UsuarioDomain> domainList) {
        return domainList.stream().map(UsuarioMapper::toResponse).collect(Collectors.toList());
    }

    public static UsuarioDomain toUpdate(UsuarioRequest request, UsuarioDomain domain) {
        domain.setNome(request.nome());
        domain.setEmail(request.email());
        return domain;
    }
}