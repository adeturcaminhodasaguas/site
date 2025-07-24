package br.com.rodrigofroes.backend.controller;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.rodrigofroes.backend.DTO.request.TurismoExperienciaRequest;
import br.com.rodrigofroes.backend.DTO.response.MensagemResponse;
import br.com.rodrigofroes.backend.DTO.response.TurismoExperienciaResponse;
import br.com.rodrigofroes.backend.service.TurismoExperienciaService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("turismo-experiencia")
public class TurismoExperienciaController {

    @Autowired
    private TurismoExperienciaService turismoExperienciaService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TurismoExperienciaResponse> cadastrar(
            @ModelAttribute @Valid TurismoExperienciaRequest request)
            throws IOException {
        TurismoExperienciaResponse turismoExperiencia = turismoExperienciaService.cadastrar(request);
        return ResponseEntity.ok(turismoExperiencia);
    }

    @PutMapping(path = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TurismoExperienciaResponse> atualizar(@PathVariable("id") UUID id,
            @ModelAttribute @Valid TurismoExperienciaRequest request)
            throws IOException {
        TurismoExperienciaResponse turismoExperiencia = turismoExperienciaService.atualizar(id, request);
        return ResponseEntity.ok(turismoExperiencia);
    }

    @PutMapping("status/{id}")
    public ResponseEntity<MensagemResponse> alterarStatus(@PathVariable("id") UUID id) {
        MensagemResponse turismoExperiencia = turismoExperienciaService.atualizarStatus(id);
        return ResponseEntity.ok(turismoExperiencia);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MensagemResponse> deletar(@PathVariable("id") UUID id) {
        MensagemResponse deletar = turismoExperienciaService.deletar(id);
        return ResponseEntity.ok(deletar);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TurismoExperienciaResponse> buscar(@PathVariable("id") UUID id) {
        TurismoExperienciaResponse turismoExperiencia = turismoExperienciaService.buscar(id);
        return ResponseEntity.ok(turismoExperiencia);
    }

    @GetMapping
    public ResponseEntity<Page<TurismoExperienciaResponse>> listar(Pageable pageable) {
        Page<TurismoExperienciaResponse> turismoExperiencia = turismoExperienciaService.listar(pageable);
        return ResponseEntity.ok(turismoExperiencia);
    }

    @GetMapping("/web/listar")
    public ResponseEntity<Page<TurismoExperienciaResponse>> listarWeb(Pageable pageable) {
        Page<TurismoExperienciaResponse> turismoExperiencias = turismoExperienciaService.listarWeb(pageable);
        return ResponseEntity.ok(turismoExperiencias);
    }
}
