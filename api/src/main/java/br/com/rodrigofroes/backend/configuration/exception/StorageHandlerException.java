package br.com.rodrigofroes.backend.configuration.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class StorageHandlerException extends RuntimeException {
    public StorageHandlerException(String message) {
        super(message);
    }
}
