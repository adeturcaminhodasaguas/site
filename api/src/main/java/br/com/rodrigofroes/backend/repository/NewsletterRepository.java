package br.com.rodrigofroes.backend.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import br.com.rodrigofroes.backend.domain.NewsletterDomain;

public interface NewsletterRepository extends GenericoRepository<NewsletterDomain, UUID> {
    Page<NewsletterDomain> findAllByDeletadoEmIsNullOrderByCriadoEm(Pageable pageable);
}