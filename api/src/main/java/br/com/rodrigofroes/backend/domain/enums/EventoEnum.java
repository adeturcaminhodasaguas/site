package br.com.rodrigofroes.backend.domain.enums;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public enum EventoEnum {
    FESTIVAL("Festival"),
    FEIRA("Feira"),
    TEATRO("Teatro"),
    TECNOLOGIA("Tecnologia"),
    AGRICULTURA("Agricultura");

    private String descricao;

    EventoEnum(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

    public static List<String> getCategorias() {
        return Arrays.stream(EventoEnum.values())
                .map(Enum::name)
                .collect(Collectors.toList());
    }
}
