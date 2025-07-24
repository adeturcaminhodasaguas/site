"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormField } from "../formField";
import { LoginForm } from "@/lib/schemas/schemas";

type FormSaboresCulturaProps = {
    register: UseFormRegister<LoginForm>;
    errors: FieldErrors<LoginForm>;
};


export default function FormLogin({ register, errors }: FormSaboresCulturaProps) {
    return (
        <>
            <FormField
                id="login"
                label="E-mail"
                type="email"
                placeholder="email@exemplo.com"
                register={register}
                error={errors.login}
                required
            />
            <FormField
                id="senha"
                label="Senha"
                type="password"
                placeholder="********"
                register={register}
                error={errors.senha}
                required
            />
        </>
    );
}