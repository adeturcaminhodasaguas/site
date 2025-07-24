package br.com.rodrigofroes.backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import br.com.rodrigofroes.backend.domain.TurismoExperienciaDomain;

public interface TurismoExperienciaRepository extends GenericoRepository<TurismoExperienciaDomain, UUID> {
    @Query("SELECT t FROM TurismoExperienciaDomain t WHERE t.deletadoEm IS NULL")
    List<TurismoExperienciaDomain> findAllWithMunicipio();

    Page<TurismoExperienciaDomain> findAllByDeletadoEmIsNullOrderByNome(Pageable pageable);

    @Query("SELECT t FROM TurismoExperienciaDomain t WHERE t.ativo = true AND t.deletadoEm IS NULL ORDER BY t.nome")
    Page<TurismoExperienciaDomain> findAllWeb(Pageable pageable);
}
