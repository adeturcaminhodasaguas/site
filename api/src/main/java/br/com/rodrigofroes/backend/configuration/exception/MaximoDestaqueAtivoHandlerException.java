package br.com.rodrigofroes.backend.configuration.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class MaximoDestaqueAtivoHandlerException extends RuntimeException {

    public MaximoDestaqueAtivoHandlerException(String message) {
        super(message);
    }
}
