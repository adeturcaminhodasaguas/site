package br.com.rodrigofroes.backend.domain;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "municipio")
public class MunicipioDomain extends BaseDomain {
    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String descricao;

    @Column(name = "url_brasao", nullable = false)
    private String urlBrasao;

    @ElementCollection
    @Column(name = "url_destaque", nullable = false)
    private List<String> urlDestaque;

    @Column(nullable = false)
    private String contato;

    @Column(nullable = false)
    private String nomeNormalizado;

    private String instagram;

    private String site;

    public MunicipioDomain(){}

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getUrlBrasao() {
        return urlBrasao;
    }

    public void setUrlBrasao(String urlBrasao) {
        this.urlBrasao = urlBrasao;
    }

    public List<String> getUrlDestaque() {
        return urlDestaque;
    }

    public void setUrlDestaque(List<String> urlDestaque) {
        this.urlDestaque = urlDestaque;
    }

    public String getInstagram() {
        return instagram;
    }

    public void setInstagram(String instagram) {
        this.instagram = instagram;
    }

    public String getSite() {
        return site;
    }

    public void setSite(String site) {
        this.site = site;
    }

    public String getContato() {
        return contato;
    }

    public void setContato(String contato) {
        this.contato = contato;
    }

    public String getNomeNormalizado() {
        return nomeNormalizado;
    }

    public void setNomeNormalizado(String nomeNormalizado) {
        this.nomeNormalizado = nomeNormalizado;
    }
}
