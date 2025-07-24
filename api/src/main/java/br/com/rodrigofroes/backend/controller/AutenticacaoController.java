package br.com.rodrigofroes.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.rodrigofroes.backend.DTO.request.AutenticacaoRequest;
import br.com.rodrigofroes.backend.DTO.response.AutenticacaoResponse;
import br.com.rodrigofroes.backend.service.LoginService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AutenticacaoController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<AutenticacaoResponse> login(@RequestBody @Valid AutenticacaoRequest data) {
        var response = loginService.login(data);
        return ResponseEntity.ok(response);
    }
}
