package br.com.rodrigofroes.backend.domain;

import java.time.LocalDate;
import java.time.LocalTime;

import br.com.rodrigofroes.backend.domain.enums.EventoEnum;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "evento")
public class EventoDomain extends BaseDomain {
    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false)
    private LocalDate data;

    @Column(nullable = false)
    private LocalTime horaInicio;

    @Column(nullable = false)
    private LocalTime horaFim;

    @Column(nullable = false)
    private String local;

    @Column(nullable = false)
    private String UrlImagem;

    private Boolean destaque = false;

    @Column(nullable = false)
    private EventoEnum categoria;

    @ManyToOne
    @JoinColumn(name = "municipio_id",  nullable = false)
    private MunicipioDomain municipioId;

    public EventoDomain() {}

    public EventoEnum getCategoria() {
        return categoria;
    }

    public void setCategoria(EventoEnum categoria) {
        this.categoria = categoria;
    }

    public Boolean getDestaque() {
        return destaque;
    }

    public void setDestaque(Boolean destaque) {
        this.destaque = destaque;
    }

    public String getLocal() {
        return local;
    }

    public void setLocal(String local) {
        this.local = local;
    }

    public LocalTime  getHoraFim() {
        return horaFim;
    }

    public void setHoraFim(LocalTime  horaFim) {
        this.horaFim = horaFim;
    }

    public LocalTime  getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(LocalTime  horaInicio) {
        this.horaInicio = horaInicio;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
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

    public String getUrlImagem() {
        return UrlImagem;
    }

    public void setUrlImagem(String urlImagem) {
        UrlImagem = urlImagem;
    }

    public MunicipioDomain getMunicipioId() {
        return municipioId;
    }

    public void setMunicipioId(MunicipioDomain municipioId) {
        this.municipioId = municipioId;
    }
}
