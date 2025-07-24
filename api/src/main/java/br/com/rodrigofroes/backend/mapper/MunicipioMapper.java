package br.com.rodrigofroes.backend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import br.com.rodrigofroes.backend.DTO.request.MunicipioRequest;
import br.com.rodrigofroes.backend.DTO.response.MunicipioResponse;
import br.com.rodrigofroes.backend.domain.MunicipioDomain;

public class MunicipioMapper {
public static MunicipioDomain toUpdate(MunicipioDomain municipioDomain, MunicipioRequest municipioRequest) {
        municipioDomain.setNome(municipioRequest.nome());
        municipioDomain.setDescricao(municipioRequest.descricao());
        municipioDomain.setInstagram(municipioRequest.instagram());
        municipioDomain.setSite(municipioRequest.site());
        municipioDomain.setContato(municipioRequest.contato());
        return municipioDomain;
    }

    public static MunicipioDomain toDomain(MunicipioRequest request) {
        MunicipioDomain municipioDomain = new MunicipioDomain();
        municipioDomain.setNome(request.nome());
        municipioDomain.setDescricao(request.descricao());
        municipioDomain.setInstagram(request.instagram());
        municipioDomain.setSite(request.site());
        municipioDomain.setContato(request.contato());
        return municipioDomain;
    }

    public static List<MunicipioResponse> toResponseList(List<MunicipioDomain> municipios) {
        return municipios.stream()
                .map(MunicipioMapper::toResponse)
                .collect(Collectors.toList());
    }

    public static MunicipioResponse toResponse(MunicipioDomain municipio) {
        return new MunicipioResponse(
                municipio.getId(),
                municipio.getNome(),
                municipio.getDescricao(),
                municipio.getUrlBrasao(),
                municipio.getUrlDestaque(),
                municipio.getInstagram(),
                municipio.getSite(),
                municipio.getContato(),
                municipio.isAtivo() ? "Ativo" : "Inativo"
        );
    }
}
