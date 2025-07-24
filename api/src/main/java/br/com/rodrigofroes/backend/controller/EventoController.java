package br.com.rodrigofroes.backend.controller;

import java.io.IOException;
import java.util.List;
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

import br.com.rodrigofroes.backend.DTO.request.EventoRequest;
import br.com.rodrigofroes.backend.DTO.response.EventoResponse;
import br.com.rodrigofroes.backend.DTO.response.MensagemResponse;
import br.com.rodrigofroes.backend.service.EventoService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/evento")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @GetMapping()
    public ResponseEntity<Page<EventoResponse>> listar(Pageable pageable) {
        Page<EventoResponse> eventos = eventoService.listar(pageable);
        return ResponseEntity.ok(eventos);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MensagemResponse> deletar(@PathVariable("id") UUID id) {
        MensagemResponse evento = eventoService.deletar(id);
        return ResponseEntity.ok(evento);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventoResponse> buscar(@PathVariable("id") UUID id) {
        EventoResponse evento = eventoService.buscar(id);
        return ResponseEntity.ok(evento);
    }

    @GetMapping("/categorias")
    public ResponseEntity<List<String>> listarCategorias() {
        List<String> categorias = eventoService.listarCategorias();
        return ResponseEntity.ok(categorias);
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<MensagemResponse> atualizarStatus(@PathVariable("id") UUID id) {
        MensagemResponse evento = eventoService.atualizarStatus(id);
        return ResponseEntity.ok(evento);
    }

    @PutMapping(path = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<EventoResponse> atualizar(@PathVariable("id") UUID id,
            @ModelAttribute @Valid EventoRequest request)
            throws IOException {
        EventoResponse evento = eventoService.atualizar(id, request);
        return ResponseEntity.ok(evento);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<EventoResponse> cadastrar(@ModelAttribute @Valid EventoRequest request)
            throws IOException {
        System.out.println(request);
        EventoResponse evento = eventoService.cadastrar(request);
        return ResponseEntity.ok(evento);
    }
}
