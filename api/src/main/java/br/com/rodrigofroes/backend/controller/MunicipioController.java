package br.com.rodrigofroes.backend.controller;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.rodrigofroes.backend.DTO.request.MunicipioRequest;
import br.com.rodrigofroes.backend.DTO.response.MensagemResponse;
import br.com.rodrigofroes.backend.DTO.response.MunicipioResponse;
import br.com.rodrigofroes.backend.DTO.response.MunicipioSelectResponse;
import br.com.rodrigofroes.backend.service.MunicipioService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/municipio")
public class MunicipioController {

    @Autowired
    private MunicipioService municipioService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<MunicipioResponse> cadastrar(@ModelAttribute @Valid MunicipioRequest request)
            throws IOException {
        MunicipioResponse municipio = municipioService.cadastrar(request);
        return ResponseEntity.ok(municipio);
    }

    @PutMapping(path = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<MunicipioResponse> atualizar(@PathVariable("id") UUID id,
            @ModelAttribute @Valid MunicipioRequest request)
            throws IOException {
        MunicipioResponse municipio = municipioService.atualizar(id, request);
        return ResponseEntity.ok(municipio);
    }
    
    @GetMapping()
    public ResponseEntity<Page<MunicipioResponse>> listar(Pageable pageable) {
        Page<MunicipioResponse> municipios = municipioService.listar(pageable);
        return ResponseEntity.ok(municipios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MunicipioResponse> buscar(@PathVariable("id") UUID id) {
        MunicipioResponse municipio = municipioService.buscar(id);
        return ResponseEntity.ok(municipio);
    }

    @GetMapping("/select")
    public ResponseEntity<List<MunicipioSelectResponse>> listarSelectMunicipio() {
        List<MunicipioSelectResponse> municipioSelectResponses = this.municipioService.listaSelectMunicipio();
        return ResponseEntity.ok(municipioSelectResponses);
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<MensagemResponse> alterarStatus(@PathVariable("id") UUID id) {
        MensagemResponse mensagem = municipioService.atualizarStatus(id);
        return ResponseEntity.ok(mensagem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MensagemResponse> excluir(@PathVariable("id") UUID id) {
        MensagemResponse mensagem = municipioService.deletar(id);
        return ResponseEntity.ok(mensagem);
    }

    @GetMapping("/web/listar")
    public ResponseEntity<Page<MunicipioResponse>> listarWeb(Pageable pageable) {
        Page<MunicipioResponse> municipios = municipioService.listarWeb(pageable);
        return ResponseEntity.ok(municipios);
    }

}
