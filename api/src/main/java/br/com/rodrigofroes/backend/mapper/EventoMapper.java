package br.com.rodrigofroes.backend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import br.com.rodrigofroes.backend.DTO.request.EventoRequest;
import br.com.rodrigofroes.backend.DTO.response.EventoResponse;
import br.com.rodrigofroes.backend.domain.EventoDomain;
import br.com.rodrigofroes.backend.domain.MunicipioDomain;

public class EventoMapper {
    public static EventoDomain toUpdate(EventoDomain eventoDomain, EventoRequest request, MunicipioDomain municipioDomain) {
        eventoDomain.setNome(request.nome());
        eventoDomain.setDescricao(request.descricao());
        eventoDomain.setData(request.data());
        eventoDomain.setHoraInicio(request.horaInicio());
        eventoDomain.setHoraFim(request.horaFim());
        eventoDomain.setCategoria(request.categoria());
        eventoDomain.setLocal(request.local());
        eventoDomain.setDestaque(request.destaque());

        eventoDomain.setMunicipioId(municipioDomain);

        return eventoDomain;
    }

    public static EventoDomain toDomain(EventoRequest request, MunicipioDomain municipioDomain){
        EventoDomain eventoDomain = new EventoDomain();

        eventoDomain.setNome(request.nome());
        eventoDomain.setDescricao(request.descricao());
        eventoDomain.setData(request.data());
        eventoDomain.setHoraInicio(request.horaInicio());
        eventoDomain.setHoraFim(request.horaFim());
        eventoDomain.setCategoria(request.categoria());
        eventoDomain.setLocal(request.local());
        eventoDomain.setDestaque(request.destaque());

        eventoDomain.setMunicipioId(municipioDomain);

        return eventoDomain;
    }

    public static EventoResponse toResponse(EventoDomain eventoDomain) {
        return new EventoResponse(
                eventoDomain.getId(),
                eventoDomain.getNome(),
                eventoDomain.getDescricao(),
                eventoDomain.getData(),
                eventoDomain.getHoraInicio(),
                eventoDomain.getHoraFim(),
                eventoDomain.getLocal(),
                eventoDomain.getUrlImagem(),
                eventoDomain.getCategoria().toString(),
                eventoDomain.getDestaque(),
                eventoDomain.isAtivo() ? "Ativo" : "Inativo",
                MunicipioResumidoMapper.toResponse(eventoDomain.getMunicipioId())
        );
    }

    public static List<EventoResponse> toResponseList(List<EventoDomain> eventos) {
        return eventos.stream()
                .map(EventoMapper::toResponse)
                .collect(Collectors.toList());
    }
}
