package br.com.rodrigofroes.backend.domain;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.UUID;

@MappedSuperclass
public abstract class BaseDomain {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @CreationTimestamp
    @Column(name = "criado_em", nullable = false, updatable = false)
    private Date criadoEm;

    @Column(name = "deletado_em", nullable = true)
    private Date deletadoEm;

    @Column(nullable = false)
    private boolean ativo = true;

    public UUID getId() {
        return id;
    }

    public Date getCriadoEm() {
        return criadoEm;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setCriadoEm(Date criadoEm) {
        this.criadoEm = criadoEm;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

    public Date getDeletadoEm() {
        return deletadoEm;
    }

    public void setDeletadoEm(Date deletadoEm) {
        this.deletadoEm = deletadoEm;
    }
}