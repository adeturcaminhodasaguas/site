package br.com.rodrigofroes.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.rodrigofroes.backend.repository.UsuarioRepository;

@Service
public class AutenticacaoService implements UserDetailsService {

    private Logger logger = LoggerFactory.getLogger(AutenticacaoService.class.getName());

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.info("Buscando Usuario. Email: {}", username);
        UserDetails usuario = usuarioRepository.findByLogin(username);
        if(usuario != null) {
            return usuario;
        }
        logger.error("Usuario não encontrado. Email: {}", username);
        throw new UsernameNotFoundException("Usuário ou senha inválidos");
    }
}