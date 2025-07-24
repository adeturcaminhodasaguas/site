package br.com.rodrigofroes.backend.util;

public class ContentTypeUtil {

    public static String renameContentTypeToWebP(String contentType) {
        if (contentType != null && (
                contentType.equals("image/jpeg") ||
                        contentType.equals("image/jpg") ||
                        contentType.equals("image/png") ||
                        contentType.startsWith("image/"))) {
            return "image/webp";
        }
        return contentType;
    }
}