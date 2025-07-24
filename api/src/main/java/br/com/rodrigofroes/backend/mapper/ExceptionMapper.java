package br.com.rodrigofroes.backend.mapper;

import java.util.Date;

import br.com.rodrigofroes.backend.DTO.response.ExceptionResponse;

public class ExceptionMapper {
    public static ExceptionResponse toResponse(Date date, String message, String details) {
        return new ExceptionResponse(date, message, details);
    }
}
