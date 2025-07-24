package br.com.rodrigofroes.backend.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.rodrigofroes.backend.DTO.request.UsuarioRequest;
import br.com.rodrigofroes.backend.DTO.response.MensagemResponse;
import br.com.rodrigofroes.backend.DTO.response.UsuarioResponse;
import br.com.rodrigofroes.backend.service.UsuarioService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {
    
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping()
    public ResponseEntity<UsuarioResponse> cadastrar(@RequestBody @Valid UsuarioRequest request) {
        UsuarioResponse usuario = usuarioService.cadastrar(request);
        return ResponseEntity.ok(usuario);
    }

    @GetMapping()
    public ResponseEntity<Page<UsuarioResponse>> listar(Pageable pageable) {
        Page<UsuarioResponse> usuarios = usuarioService.listar(pageable);
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> buscar(@PathVariable("id") UUID id) {
        UsuarioResponse usuario = usuarioService.buscar(id);
        return ResponseEntity.ok(usuario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponse> atualizar(@PathVariable("id") UUID id, @RequestBody @Valid UsuarioRequest request) {
        UsuarioResponse usuario = usuarioService.atualizar(id, request);
        return ResponseEntity.ok(usuario);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable("id") UUID id) {
        usuarioService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("status/{id}")
    public ResponseEntity<MensagemResponse> atualizarStatus(@PathVariable("id") UUID id) {
       MensagemResponse mensagem = usuarioService.atualizarStatus(id);
        return ResponseEntity.ok(mensagem);
    }
    
    
}
