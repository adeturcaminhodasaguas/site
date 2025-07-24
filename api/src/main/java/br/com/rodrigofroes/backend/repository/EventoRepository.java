package br.com.rodrigofroes.backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import br.com.rodrigofroes.backend.domain.EventoDomain;

public interface EventoRepository extends GenericoRepository<EventoDomain, UUID> {
    @Query("SELECT COUNT(e) FROM EventoDomain e WHERE e.destaque = true AND e.deletadoEm IS NULL")
    long countEventosComDestaque();

    List<EventoDomain> findByDestaqueAndDeletadoEmIsNull(boolean destaque);

    Page<EventoDomain> findAllByDeletadoEmIsNullOrderByNome(Pageable pageable);
}