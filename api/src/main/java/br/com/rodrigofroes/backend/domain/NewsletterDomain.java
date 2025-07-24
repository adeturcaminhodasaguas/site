package br.com.rodrigofroes.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "newsletter")
public class NewsletterDomain extends BaseDomain {

    @Column(nullable = false)
    private String email;

    public NewsletterDomain() {}

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

