package br.com.rodrigofroes.backend.configuration.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class EmailJaCadastradoHandlerConflictException extends RuntimeException {
    public EmailJaCadastradoHandlerConflictException(String message) {
        super(message);
    }
}
