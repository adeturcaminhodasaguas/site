package br.com.rodrigofroes.backend.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import br.com.rodrigofroes.backend.domain.SaborCulturaDomain;

public interface SaborCulturaRepository extends GenericoRepository<SaborCulturaDomain, UUID> {
    Page<SaborCulturaDomain> findAllByDeletadoEmIsNullOrderByNome(Pageable pageable);

    @Query("SELECT s FROM SaborCulturaDomain s WHERE s.ativo = true AND s.deletadoEm IS NULL ORDER BY s.nome")
    Page<SaborCulturaDomain> findAllWeb(Pageable pageable);
}
