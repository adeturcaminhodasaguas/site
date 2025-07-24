package br.com.rodrigofroes.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface GenericoRepository<T, ID> extends JpaRepository<T, ID> {
    Optional<T> findByIdAndDeletadoEmIsNull(ID id);
}
