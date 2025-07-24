package br.com.rodrigofroes.backend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import br.com.rodrigofroes.backend.DTO.request.NewsletterRequest;
import br.com.rodrigofroes.backend.DTO.response.NewsletterResponse;
import br.com.rodrigofroes.backend.domain.NewsletterDomain;

public class NewsletterMapper {
    
    public static NewsletterResponse toResponse(NewsletterDomain newsletter) {
        return new NewsletterResponse(
                newsletter.getId(),
                newsletter.getEmail(),
                newsletter.isAtivo() ? "Ativo" : "Inativo"
        );
    }

    public static NewsletterDomain toDomain(NewsletterRequest request) {
        NewsletterDomain domain = new NewsletterDomain();
        domain.setEmail(request.email());
        return domain;
    }

    public static List<NewsletterResponse> toResponseList(List<NewsletterDomain> newsletters) {
        return newsletters.stream()
                .map(NewsletterMapper::toResponse)
                .collect(Collectors.toList());
    }
}
