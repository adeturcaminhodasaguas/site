package br.com.rodrigofroes.backend.mapper;

import br.com.rodrigofroes.backend.DTO.response.MunicipioResumidoResponse;
import br.com.rodrigofroes.backend.domain.MunicipioDomain;

public class MunicipioResumidoMapper {
    public static MunicipioResumidoResponse toResponse(MunicipioDomain municipio) {
        return new MunicipioResumidoResponse(municipio.getId(), municipio.getNome());
    }
}
