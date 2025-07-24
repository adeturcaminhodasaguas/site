package br.com.rodrigofroes.backend.service;

import java.util.Date;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.rodrigofroes.backend.DTO.request.UsuarioRequest;
import br.com.rodrigofroes.backend.DTO.response.MensagemResponse;
import br.com.rodrigofroes.backend.DTO.response.UsuarioResponse;
import br.com.rodrigofroes.backend.configuration.exception.UsuarioHandlerNotFoundException;
import br.com.rodrigofroes.backend.domain.UsuarioDomain;
import br.com.rodrigofroes.backend.mapper.MensagemMapper;
import br.com.rodrigofroes.backend.mapper.UsuarioMapper;
import br.com.rodrigofroes.backend.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private Logger logger = LoggerFactory.getLogger(UsuarioService.class.getName());

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Page<UsuarioResponse> listar(Pageable pageable) {
        Page<UsuarioDomain> usuarios = usuarioRepository.findAllWhereDeletadoEmIsNull(pageable);
        logger.info("Listando Usuarios. Total: {}", usuarios.getTotalElements());
        return usuarios.map(UsuarioMapper::toResponse);
    }

    public UsuarioResponse buscar(UUID id) {
        UsuarioDomain usuario = existeUsuario(id);
        logger.info("Buscando Usuario. ID: {}", usuario.getId());
        return UsuarioMapper.toResponse(usuario);
    }

    public UsuarioResponse cadastrar(UsuarioRequest usuario) {
        existeEmail(usuario.email());
        
        UsuarioDomain usuarioDomain = UsuarioMapper.toDomain(usuario);
        logger.info("Cadastrando Usuario. Nome: {}", usuarioDomain.getNome());

        String hash = passwordEncoder.encode(usuarioDomain.getSenha());
        usuarioDomain.setSenha(hash);

        UsuarioDomain salvar = usuarioRepository.save(usuarioDomain);
        return UsuarioMapper.toResponse(salvar);
    }

public UsuarioResponse atualizar(UUID id, UsuarioRequest usuario) {
    atualizarEmailUsuario(id, usuario.email());

    UsuarioDomain usuarioDomain = existeUsuario(id);

    if (usuario.senha() != null && !usuario.senha().isEmpty()) {
        String hash = passwordEncoder.encode(usuario.senha());
        usuarioDomain.setSenha(hash);
    }

    UsuarioDomain atualizado = UsuarioMapper.toUpdate(usuario, usuarioDomain);

    logger.info("Atualizando Usuario. ID: {}", atualizado.getId());

    UsuarioDomain salvo = usuarioRepository.save(atualizado);
    return UsuarioMapper.toResponse(salvo);
}


    public MensagemResponse deletar(UUID id) {
        UsuarioDomain usuario = existeUsuario(id);
        usuario.setDeletadoEm(new Date());
        logger.info("Deletando Usuario. ID: {}", usuario.getId());
        usuarioRepository.save(usuario);
        return MensagemMapper.toResponse("Usuario deletado com sucesso");
    }

    public MensagemResponse atualizarStatus(UUID Id) {
        UsuarioDomain usuario = existeUsuario(Id);
        usuario.setAtivo(!usuario.isAtivo());
        logger.info("Atualizando Status do Usuario. ID: {}", usuario.getId());
        usuarioRepository.save(usuario);
        return MensagemMapper.toResponse("Status atualizado com sucesso");
    }

    private void atualizarEmailUsuario(UUID id, String email) {
        usuarioRepository.findByEmail(email)
            .stream()
            .filter(usuario -> !usuario.getId().equals(id))
            .findFirst()
            .ifPresent(usuario -> {
                logger.error("Email já cadastrado. Email: {}", email);
                throw new UsuarioHandlerNotFoundException("Email já cadastrado");
            });
    }

    private void existeEmail(String email) {
        if(usuarioRepository.existsByEmail(email)){
            logger.error("Email já cadastrado. Email: {}", email);
            throw new UsuarioHandlerNotFoundException("Email já cadastrado");
        }
    }

    private UsuarioDomain existeUsuario(UUID id) {
        return usuarioRepository.findByIdAndDeletadoEmIsNull(id)
                .orElseThrow(() -> {
                    logger.error("Usuario não encontrado. ID: {}", id);
                    return new UsuarioHandlerNotFoundException("Usuario não encontrado");
                });
    }

}
