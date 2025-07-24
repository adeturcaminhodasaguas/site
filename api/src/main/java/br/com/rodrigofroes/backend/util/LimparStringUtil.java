package br.com.rodrigofroes.backend.util;

import java.text.Normalizer;

public class LimparStringUtil {
    public static String limpar(String nome) {
        return Normalizer.normalize(nome, Normalizer.Form.NFD)
                .replaceAll("[^\\p{ASCII}]", "") // remove acentos
                .replaceAll("\\s+", "") // remove espaços
                .toLowerCase(); // lowercase
    }
}
