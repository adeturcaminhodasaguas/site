package br.com.rodrigofroes.backend.domain.enums;

public enum UsuarioEnum {
    ADMIN("admin");

    private String descricao;

    UsuarioEnum(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
