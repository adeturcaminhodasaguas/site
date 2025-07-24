package br.com.rodrigofroes.backend.configuration.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class SaborCulturaHandlerNotFoundException extends RuntimeException {
    public SaborCulturaHandlerNotFoundException(String message) {
        super(message);
    }
}
