package br.com.rodrigofroes.backend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import br.com.rodrigofroes.backend.DTO.request.TurismoExperienciaRequest;
import br.com.rodrigofroes.backend.DTO.response.TurismoExperienciaResponse;
import br.com.rodrigofroes.backend.domain.MunicipioDomain;
import br.com.rodrigofroes.backend.domain.TurismoExperienciaDomain;

public class TurismoExperienciaMapper {
     public static TurismoExperienciaDomain toUpdate(TurismoExperienciaDomain turismoExperienciaDomain, TurismoExperienciaRequest request, MunicipioDomain municipioDomain) {
        turismoExperienciaDomain.setNome(request.nome());
        turismoExperienciaDomain.setDescricao(request.descricao());
        turismoExperienciaDomain.setContato(request.contato());
        turismoExperienciaDomain.setInstagram(request.instagram());
        turismoExperienciaDomain.setSite(request.site());

        turismoExperienciaDomain.setMunicipioId(municipioDomain);

        return turismoExperienciaDomain;
    }


    public static TurismoExperienciaDomain toDomain(TurismoExperienciaRequest request, MunicipioDomain municipioDomain){
        TurismoExperienciaDomain turismoExperienciaDomain = new TurismoExperienciaDomain();

        turismoExperienciaDomain.setId(request.id());
        turismoExperienciaDomain.setNome(request.nome());
        turismoExperienciaDomain.setDescricao(request.descricao());
        turismoExperienciaDomain.setContato(request.contato());
        turismoExperienciaDomain.setInstagram(request.instagram());
        turismoExperienciaDomain.setSite(request.site());

        turismoExperienciaDomain.setMunicipioId(municipioDomain);

        return turismoExperienciaDomain;
    }

    public static TurismoExperienciaResponse toResponse(TurismoExperienciaDomain turismoExperienciaDomain) {
        return new TurismoExperienciaResponse(
                turismoExperienciaDomain.getId(),
                turismoExperienciaDomain.getNome(),
                turismoExperienciaDomain.getDescricao(),
                turismoExperienciaDomain.getUrlImagem(),
                turismoExperienciaDomain.getContato(),
                turismoExperienciaDomain.getInstagram(),
                turismoExperienciaDomain.getSite(),
                MunicipioResumidoMapper.toResponse(turismoExperienciaDomain.getMunicipioId()),
                turismoExperienciaDomain.isAtivo() ? "Ativo" : "Inativo"
        );
    }

    public static List<TurismoExperienciaResponse> toResponseList(List<TurismoExperienciaDomain> turismoExperienciaDomains) {
        return turismoExperienciaDomains.stream()
                .map(TurismoExperienciaMapper::toResponse)
                .collect(Collectors.toList());
    }
}
