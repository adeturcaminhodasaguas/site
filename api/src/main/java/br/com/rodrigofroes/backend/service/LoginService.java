package br.com.rodrigofroes.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import br.com.rodrigofroes.backend.DTO.request.AutenticacaoRequest;
import br.com.rodrigofroes.backend.DTO.response.AutenticacaoResponse;
import br.com.rodrigofroes.backend.configuration.security.TokenServiceConfiguration;
import br.com.rodrigofroes.backend.domain.UsuarioDomain;
import br.com.rodrigofroes.backend.mapper.AutenticacaoMapper;

@Service
public class LoginService {

    private Logger logger = LoggerFactory.getLogger(LoginService.class.getName());

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenServiceConfiguration tokenServiceConfiguration;

    public AutenticacaoResponse login(AutenticacaoRequest data) {
        logger.info("Realizando login para o usuário: {}", data.login());

        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.senha());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        UsuarioDomain usuario = (UsuarioDomain) auth.getPrincipal();
        String token = tokenServiceConfiguration.generateToken(usuario);

        logger.info("Login realizado com sucesso para o usuário: {}", usuario.getEmail());

        return AutenticacaoMapper.toResponse(token, usuario);
    }
}
