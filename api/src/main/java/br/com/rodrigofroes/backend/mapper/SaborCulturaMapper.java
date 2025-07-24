package br.com.rodrigofroes.backend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import br.com.rodrigofroes.backend.DTO.request.SaborCulturaRequest;
import br.com.rodrigofroes.backend.DTO.response.SaborCulturaResponse;
import br.com.rodrigofroes.backend.domain.MunicipioDomain;
import br.com.rodrigofroes.backend.domain.SaborCulturaDomain;

public class SaborCulturaMapper {
     public static SaborCulturaDomain toUpdate(SaborCulturaDomain saborCulturaDomain, SaborCulturaRequest request, MunicipioDomain municipioDomain) {
        saborCulturaDomain.setNome(request.nome());
        saborCulturaDomain.setDescricao(request.descricao());
        saborCulturaDomain.setContato(request.contato());
        saborCulturaDomain.setInstagram(request.instagram());
        saborCulturaDomain.setSite(request.site());

        saborCulturaDomain.setMunicipioId(municipioDomain);

        return saborCulturaDomain;
    }


    public static SaborCulturaDomain toDomain(SaborCulturaRequest request, MunicipioDomain municipioDomain){
        SaborCulturaDomain saborCulturaDomain = new SaborCulturaDomain();

        saborCulturaDomain.setId(request.id());
        saborCulturaDomain.setNome(request.nome());
        saborCulturaDomain.setDescricao(request.descricao());
        saborCulturaDomain.setContato(request.contato());
        saborCulturaDomain.setInstagram(request.instagram());
        saborCulturaDomain.setSite(request.site());

        saborCulturaDomain.setMunicipioId(municipioDomain);

        return saborCulturaDomain;
    }

    public static SaborCulturaResponse toResponse(SaborCulturaDomain saborCulturaDomain) {
        return new SaborCulturaResponse(
                saborCulturaDomain.getId(),
                saborCulturaDomain.getNome(),
                saborCulturaDomain.getDescricao(),
                saborCulturaDomain.getUrlImagem(),
                saborCulturaDomain.getContato(),
                saborCulturaDomain.getInstagram(),
                saborCulturaDomain.getSite(),
                MunicipioResumidoMapper.toResponse(saborCulturaDomain.getMunicipioId()),
                saborCulturaDomain.isAtivo() ? "Ativo" : "Inativo"
        );
    }

    public static List<SaborCulturaResponse> toResponseList(List<SaborCulturaDomain> saborCulturaDomains) {
        return saborCulturaDomains.stream()
                .map(SaborCulturaMapper::toResponse)
                .collect(Collectors.toList());
    }
}
