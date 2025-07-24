package br.com.rodrigofroes.backend.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;

import br.com.rodrigofroes.backend.domain.UsuarioDomain;

public interface UsuarioRepository extends JpaRepository<UsuarioDomain, UUID> {
    @Query("SELECT u FROM UsuarioDomain u WHERE u.deletadoEm IS NULL ORDER BY u.nome")
    Page<UsuarioDomain> findAllWhereDeletadoEmIsNull(Pageable pageable);

    @Query("SELECT u FROM UsuarioDomain u WHERE u.ativo = true AND u.deletadoEm IS NULL AND u.email = ?1")
    UsuarioDomain findByEmailAndAtivoTrue(String email);

    @Query("SELECT u FROM UsuarioDomain u WHERE u.id = ?1 AND u.deletadoEm IS NULL")
    Optional<UsuarioDomain> findByIdAndDeletadoEmIsNull(UUID id);

    @Query("SELECT u FROM UsuarioDomain u WHERE u.email = ?1 AND u.deletadoEm IS NULL")
    Optional<UsuarioDomain> findByEmailAndDeletadoEmIsNull(String email);

    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END FROM UsuarioDomain u WHERE u.email = ?1 AND u.deletadoEm IS NULL")
    Boolean existsByEmail(String email);

    @Query("SELECT u FROM UsuarioDomain u WHERE u.email = ?1 AND u.deletadoEm IS NULL")
    Optional<UsuarioDomain> findByEmail(String email);

    @Query("SELECT u FROM UsuarioDomain u WHERE u.email = ?1 AND u.ativo = true AND u.deletadoEm IS NULL")
    UserDetails findByLogin(String email);
}
