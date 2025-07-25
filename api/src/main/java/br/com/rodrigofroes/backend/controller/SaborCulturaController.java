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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.rodrigofroes.backend.DTO.request.SaborCulturaRequest;
import br.com.rodrigofroes.backend.DTO.response.MensagemResponse;
import br.com.rodrigofroes.backend.DTO.response.SaborCulturaResponse;
import br.com.rodrigofroes.backend.service.SaborCulturaService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/sabor-cultura")
public class SaborCulturaController {
    
    @Autowired
    private SaborCulturaService saborCulturaService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<SaborCulturaResponse> cadastrar(
            @ModelAttribute @Valid SaborCulturaRequest request)
            throws IOException {
        SaborCulturaResponse saborCulturaResponse = saborCulturaService.cadastrar(request);
        return ResponseEntity.ok(saborCulturaResponse);
    }

    @PutMapping(path = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<SaborCulturaResponse> atualizar(@PathVariable("id") UUID id,
            @ModelAttribute @Valid SaborCulturaRequest request)
            throws IOException {
        SaborCulturaResponse saborCultura = saborCulturaService.atualizar(id, request);
        return ResponseEntity.ok(saborCultura);
    }

    @PutMapping("status/{id}")
    public ResponseEntity<MensagemResponse> alterarStatus(@PathVariable("id") UUID id) {
        MensagemResponse saborCultura = saborCulturaService.atualizarStatus(id);
        return ResponseEntity.ok(saborCultura);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MensagemResponse> deletar(@PathVariable("id") UUID id) {
        MensagemResponse deletar = saborCulturaService.deletar(id);
        return ResponseEntity.ok(deletar);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SaborCulturaResponse> buscar(@PathVariable("id") UUID id) {
        SaborCulturaResponse saborCultura = saborCulturaService.buscar(id);
        return ResponseEntity.ok(saborCultura);
    }

    @GetMapping
    public ResponseEntity<Page<SaborCulturaResponse>> listar(Pageable pageable) {
        Page<SaborCulturaResponse> saborCultura = saborCulturaService.listar(pageable);
        return ResponseEntity.ok(saborCultura);
    }

    @GetMapping("/web/listar")
    public ResponseEntity<Page<SaborCulturaResponse>> listarWeb(Pageable pageable) {
        Page<SaborCulturaResponse> saborCultura = saborCulturaService.listarWeb(pageable);
        return ResponseEntity.ok(saborCultura);
    }
}
