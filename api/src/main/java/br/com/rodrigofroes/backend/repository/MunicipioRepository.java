package br.com.rodrigofroes.backend.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import br.com.rodrigofroes.backend.domain.MunicipioDomain;

public interface MunicipioRepository extends GenericoRepository<MunicipioDomain, UUID> {
    @Query("SELECT COUNT(m) > 0 FROM MunicipioDomain m WHERE m.nomeNormalizado = ?1 AND m.deletadoEm IS NULL")
    boolean existsByNomeNormalizado(String nomeNormalizado);

    @Query("SELECT m FROM MunicipioDomain m LEFT JOIN FETCH m.urlDestaque WHERE m.deletadoEm IS NULL ORDER BY m.nome")
    Page<MunicipioDomain> findAllWithUrlDestaque(Pageable pageable);

    @Query("SELECT m FROM MunicipioDomain m LEFT JOIN FETCH m.urlDestaque WHERE m.deletadoEm IS NULL AND m.id = ?1")
    Optional<MunicipioDomain> findByIdWithUrlDestaque(UUID id);

    @Query("""
            SELECT m
            FROM MunicipioDomain m
            LEFT JOIN TurismoExperienciaDomain t ON t.municipioId = m AND t.ativo = true
            WHERE m.ativo = true OR t.id IS NOT NULL AND m.deletadoEm IS NULL
            """)
    List<MunicipioDomain> findSelect();

    Optional<MunicipioDomain> findByNomeNormalizadoAndDeletadoEmIsNull(String nomeNormalizado);

    @Query("SELECT m FROM MunicipioDomain m LEFT JOIN FETCH m.urlDestaque WHERE m.ativo = true AND m.deletadoEm IS NULL ORDER BY m.nome")
    Page<MunicipioDomain> findAllWeb(Pageable pageable);

}