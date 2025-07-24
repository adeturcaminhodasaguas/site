package br.com.rodrigofroes.backend.mapper;

import br.com.rodrigofroes.backend.DTO.response.AutenticacaoResponse;
import br.com.rodrigofroes.backend.DTO.response.UsuarioResponse;
import br.com.rodrigofroes.backend.domain.UsuarioDomain;

public class AutenticacaoMapper {

    public static AutenticacaoResponse toResponse(String token, UsuarioDomain usuario) {
        UsuarioResponse usuarioResponse = UsuarioMapper.toResponse(usuario);

        return new AutenticacaoResponse(token, usuarioResponse);
    }
}