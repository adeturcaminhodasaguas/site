package br.com.rodrigofroes.backend.DTO.response;

import java.util.UUID;

public record NewsletterResponse(
        UUID id,
        String email,
        String status
) {}