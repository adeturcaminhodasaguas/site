import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormField } from "../formField"

type FormUsuarioProps = {
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
    editingId?: string | null;
}

export default function FormUsuario({ register, errors, editingId }: FormUsuarioProps) {
    return (
        <div className="space-y-6">
            <FormField
                id="nome"
                label="Nome do Usuário"
                type="text"
                placeholder="Digite o nome do usuário"
                register={register}
                error={errors.nome as any}
                required
            />

            <FormField
                id="email"
                label="Email do Usuário"
                type="email"
                placeholder="Digite o email do usuário"
                register={register}
                error={errors.email as any}
                required
            />

            <FormField
                id="senha"
                label={`Senha do Usuário ${editingId ? '(deixe em branco para não alterar)' : ''}`}
                type="password"
                placeholder="Digite a senha do usuário"
                register={register}
                error={errors.senha as any}
                required={!editingId}
            />
        </div>
    );
}