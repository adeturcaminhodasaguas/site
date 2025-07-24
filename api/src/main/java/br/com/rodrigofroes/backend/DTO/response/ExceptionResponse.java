package br.com.rodrigofroes.backend.DTO.response;

import java.util.Date;

public record ExceptionResponse(
    Date timestamp,    
    String message,
    String path
) {}
