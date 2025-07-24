package br.com.rodrigofroes.backend.service;

import java.util.Date;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.rodrigofroes.backend.DTO.request.NewsletterRequest;
import br.com.rodrigofroes.backend.DTO.response.MensagemResponse;
import br.com.rodrigofroes.backend.DTO.response.NewsletterResponse;
import br.com.rodrigofroes.backend.configuration.exception.NewsletterNotFoundException;
import br.com.rodrigofroes.backend.domain.NewsletterDomain;
import br.com.rodrigofroes.backend.mapper.MensagemMapper;
import br.com.rodrigofroes.backend.mapper.NewsletterMapper;
import br.com.rodrigofroes.backend.repository.NewsletterRepository;

@Service
public class NewsletterService {

    Logger logger = LoggerFactory.getLogger(NewsletterService.class);

    @Autowired
    private NewsletterRepository newsletterRepository;

    public Page<NewsletterResponse> listar(Pageable pageable) {
        Page<NewsletterDomain> newsletters = newsletterRepository.findAllByDeletadoEmIsNullOrderByCriadoEm(pageable);
        logger.info("Listando newsletters. Total: {}", newsletters.getTotalElements());
        return newsletters.map(NewsletterMapper::toResponse);
    }

    public NewsletterResponse salvar(NewsletterRequest request) {
        NewsletterDomain map = NewsletterMapper.toDomain(request);
        NewsletterDomain salvar = newsletterRepository.save(map);
        logger.info("Newsletter salva com sucesso: {}", salvar.getId());
        return NewsletterMapper.toResponse(salvar);
    }

    public MensagemResponse atualizarStatus(UUID id) {
        NewsletterDomain newsletter = existeNewsletter(id);
        newsletter.setAtivo(!newsletter.isAtivo());
        newsletterRepository.save(newsletter);
        logger.info("Status da newsletter atualizado com sucesso. ID: {}", newsletter.getId());
        return MensagemMapper.toResponse("Status da newsletter atualizado com sucesso");
    }

    public MensagemResponse deletar(UUID id) {
        NewsletterDomain newsletter = existeNewsletter(id);
        newsletter.setDeletadoEm(new Date());
        logger.info("Newsletter deletada com sucesso: {}", id);
        newsletterRepository.save(newsletter);
        return MensagemMapper.toResponse("Newsletter deletada com sucesso");
    }

    private NewsletterDomain existeNewsletter(UUID id) {
        return newsletterRepository.findByIdAndDeletadoEmIsNull(id)
        .orElseThrow(() -> {
            logger.error("Newsletter não encontrada. ID: {}", id);
            return new NewsletterNotFoundException("Newsletter não encontrada com o ID: " + id);
        });
    }
}
