package br.com.rodrigofroes.backend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import br.com.rodrigofroes.backend.DTO.response.MunicipioSelectResponse;
import br.com.rodrigofroes.backend.domain.MunicipioDomain;

public class MunicipioSelectMapper {
     public static MunicipioSelectResponse toResponse(MunicipioDomain municipioDomain){
       return new MunicipioSelectResponse(municipioDomain.getId(), municipioDomain.getNome());
    }

    public static List<MunicipioSelectResponse> toResponseList(List<MunicipioDomain> domains){
        return domains.stream()
                .map(MunicipioSelectMapper::toResponse)
                .collect(Collectors.toList());
    }
}
