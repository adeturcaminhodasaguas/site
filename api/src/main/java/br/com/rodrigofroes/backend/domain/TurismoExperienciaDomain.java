package br.com.rodrigofroes.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "turismo_experiencia")
public class TurismoExperienciaDomain extends BaseDomain{
    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false)
    private String urlImagem;

    @Column(nullable = false)
    private String contato;

    private String instagram;

    private String site;

    @ManyToOne
    @JoinColumn(name = "municipio_id", nullable = false)
    private MunicipioDomain municipioId;

    public TurismoExperienciaDomain() {}

    public String getSite() {
        return site;
    }

    public void setSite(String site) {
        this.site = site;
    }

    public String getInstagram() {
        return instagram;
    }

    public void setInstagram(String instagram) {
        this.instagram = instagram;
    }

    public String getContato() {
        return contato;
    }

    public void setContato(String contato) {
        this.contato = contato;
    }

    public String getUrlImagem() {
        return urlImagem;
    }

    public void setUrlImagem(String urlImagem) {
        this.urlImagem = urlImagem;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public MunicipioDomain getMunicipioId() {
        return municipioId;
    }

    public void setMunicipioId(MunicipioDomain municipioId) {
        this.municipioId = municipioId;
    }
}
