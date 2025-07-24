package br.com.rodrigofroes.backend.util;

import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

public class GerarNomeUtil {
    public static String gerarNomeArquivo(String prefixo, String tipo, MultipartFile arquivo) {
        String extensao = "webp";
        String nomeBase = prefixo.toLowerCase().replaceAll("\\s+", "-");
        return String.format("%s-%s-%s.%s", nomeBase, tipo, UUID.randomUUID(), extensao);
    }
}
