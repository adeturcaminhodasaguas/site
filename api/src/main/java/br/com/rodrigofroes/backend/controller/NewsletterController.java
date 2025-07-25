package br.com.rodrigofroes.backend.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.rodrigofroes.backend.DTO.request.NewsletterRequest;
import br.com.rodrigofroes.backend.DTO.response.MensagemResponse;
import br.com.rodrigofroes.backend.DTO.response.NewsletterResponse;
import br.com.rodrigofroes.backend.service.NewsletterService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/newsletter")
public class NewsletterController {
    
    @Autowired
    private NewsletterService newsletterService;

    @GetMapping
    public ResponseEntity<Page<NewsletterResponse>> listar(Pageable pageable){
        Page<NewsletterResponse> newsletters = newsletterService.listar(pageable);
        return ResponseEntity.ok(newsletters);
    }

    @PostMapping
    public ResponseEntity<NewsletterResponse> salvar(@RequestBody @Valid NewsletterRequest request) {
        NewsletterResponse response = newsletterService.salvar(request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("status/{id}")
    public ResponseEntity<MensagemResponse> atualizarStatus(@PathVariable("id") UUID id) {
        MensagemResponse response = newsletterService.atualizarStatus(id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MensagemResponse> deletar(@PathVariable("id") UUID id) {
        MensagemResponse response = newsletterService.deletar(id);
        return ResponseEntity.ok(response);
    }
}