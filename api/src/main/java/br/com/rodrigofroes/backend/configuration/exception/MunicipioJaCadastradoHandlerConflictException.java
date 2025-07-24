package br.com.rodrigofroes.backend.configuration.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class MunicipioJaCadastradoHandlerConflictException extends RuntimeException {
    public MunicipioJaCadastradoHandlerConflictException(String message) {
        super(message);
    }
}
