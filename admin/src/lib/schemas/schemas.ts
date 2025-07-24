import * as z from 'zod';

export const loginSchema = z.object({
    login: z.string().min(1, 'Campo obrigatório'),
    senha: z.string().min(1, 'Campo obrigatório'),
})

export const municipioSchema = z.object({
    id: z.string().optional(),
    nome: z.string().min(1, 'Nome é obrigatório'),
    descricao: z.string().min(1, 'Descrição é obrigatória'),
    brasao: z.instanceof(File, { message: 'Brasão é obrigatório' }).optional(),
    destaque: z.array(z.instanceof(File)).optional(),
    instagram: z.string().url('URL inválida').optional().or(z.literal('')),
    site: z.string().url('URL inválida').optional().or(z.literal('')),
    contato: z.string().min(1, 'Contato é obrigatório'),
});

export const turismoExperienciaSchema = z.object({
    id: z.string().optional(),
    nome: z.string().min(1, 'Nome é obrigatório'),
    descricao: z.string().min(1, 'Descrição é obrigatória'),
    imagem: z.instanceof(File, { message: 'Imagem é obrigatório' }).optional(),
    municipioId: z.string().min(1, 'Município é obrigatório'),
    instagram: z.string().url('URL inválida').optional().or(z.literal('')),
    site: z.string().url('URL inválida').optional().or(z.literal('')),
    contato: z.string().min(1, 'Contato é obrigatório'),
})

export const saboresCulturaSchema = z.object({
    id: z.string().optional(),
    nome: z.string().min(1, 'Nome é obrigatório'),
    descricao: z.string().min(1, 'Descrição é obrigatória'),
    imagem: z.instanceof(File, { message: 'Imagem é obrigatório' }).optional(),
    municipioId: z.string().min(1, 'Município é obrigatório'),
    instagram: z.string().url('URL inválida').optional().or(z.literal('')),
    site: z.string().url('URL inválida').optional().or(z.literal('')),
    contato: z.string().min(1, 'Contato é obrigatório'),
})

export const usuarioSchema = z.object({
    id: z.string().optional(),
    nome: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
    senha: z.string().min(1, 'Senha é obrigatória')
})

// Schema para edição onde a senha é opcional
export const usuarioEditSchema = z.object({
    id: z.string().optional(),
    nome: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
    senha: z.string().optional().or(z.literal(''))
})

export const eventoSchema = z.object({
    id: z.string().optional(),
    nome: z.string().min(1, 'Nome é obrigatório'),
    descricao: z.string().min(1, 'Descrição é obrigatória'),
    data: z
        .string()
        .min(1, 'Data é obrigatória')
        .refine(date => {
            const inputDate = new Date(date);
            if (isNaN(inputDate.getTime())) return false;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return inputDate >= today;
        }, { message: 'Data deve ser futura ou igual ao dia atual' }),
    horaInicio: z.string().min(1, 'Hora de início é obrigatória'),
    horaFim: z.string().min(1, 'Hora de fim é obrigatória'),
    local: z.string().min(1, 'Local é obrigatório'),
    imagem: z.instanceof(File, { message: 'Imagem é obrigatória' }).optional(),
    categoria: z.string().min(1, 'Categoria é obrigatória'),
    destaque: z.boolean(),
    municipioId: z.string().uuid('ID de município inválido')
});


export type EventoForm = z.infer<typeof eventoSchema>;
export type UsuarioForm = z.infer<typeof usuarioSchema>;
export type UsuarioEditForm = z.infer<typeof usuarioEditSchema>;
export type UsuarioFormUnion = UsuarioForm | UsuarioEditForm;
export type LoginForm = z.infer<typeof loginSchema>;
export type MunicipioForm = z.infer<typeof municipioSchema>;
export type TurismoExperienciaForm = z.infer<typeof turismoExperienciaSchema>;
export type SaboresCulturaForm = z.infer<typeof saboresCulturaSchema>;
