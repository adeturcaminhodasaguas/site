package br.com.rodrigofroes.backend.configuration.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UsuarioHandlerNotFoundException extends RuntimeException {
    public UsuarioHandlerNotFoundException(String message) {
        super(message);
    }
}
