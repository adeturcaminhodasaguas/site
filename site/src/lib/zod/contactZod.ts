import { z } from "zod";

export const contactSchema = z.object({
    nome: z.string()
        .min(3, "O nome deve ter pelo menos 3 caracteres.")
        .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "O nome deve conter apenas letras e espaços."),
    email: z.string()
        .email("O e-mail deve ser válido.")
        .min(1, "O e-mail é obrigatório."),
    mensagem: z.string()
        .min(10, "A mensagem deve ter pelo menos 10 caracteres.")
        .max(500, "A mensagem não pode ter mais de 500 caracteres."),
    telefone: z.string()
        .min(15, "O telefone deve ser válido.")
        .regex(/^[()\d\s-]+$/, "O telefone deve conter apenas números e espaços."),
    assunto: z.string()
        .min(3, "O assunto deve ter pelo menos 3 caracteres.")
        .max(100, "O assunto não pode ter mais de 100 caracteres."),
});