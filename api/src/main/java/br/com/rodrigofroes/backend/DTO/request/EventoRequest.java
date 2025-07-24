package br.com.rodrigofroes.backend.DTO.request;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import br.com.rodrigofroes.backend.domain.enums.EventoEnum;

public record EventoRequest(
        UUID id,
        String nome,
        String descricao,
        LocalDate  data,
        LocalTime  horaInicio,
        LocalTime horaFim,
        String local,
        MultipartFile imagem,
        EventoEnum categoria,
        Boolean destaque,
        UUID municipioId  
) {}
