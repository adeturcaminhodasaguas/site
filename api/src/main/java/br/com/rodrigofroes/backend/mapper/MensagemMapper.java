package br.com.rodrigofroes.backend.mapper;

import br.com.rodrigofroes.backend.DTO.response.MensagemResponse;

public class MensagemMapper {
    public static MensagemResponse toResponse(String mensagem) {
        return new MensagemResponse(mensagem);
    }
}