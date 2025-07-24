"use client";

import FormLogin from "@/components/forms/formLogin"
import PrimaryButton from "@/components/PrimaryButton"
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import { useAuth } from "@/contexts/AuthContexts";
import { useFormDialog } from "@/hooks/use-form-dialog";
import { LoginForm, loginSchema } from "@/lib/schemas/schemas"
import AuthService from "@/lib/service/authService";
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useRouter();
    const { toast } = useFormDialog();

    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginForm) => {
        setIsSubmitting(true);
        try {
            const authService = new AuthService();
            const response = await authService.login(data);
            await login(response);
            form.reset();

        } catch (error: any) {
            toast("error", error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 ">
            <Card className="w-full max-w-md shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader className="text-center space-y-6 pb-8">
                    <div className="flex justify-center mt-4">
                        <div>
                            <Image
                                src="/logo.png"
                                alt="Logo caminho das águas"
                                width={150}
                                height={150}

                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-gray-900">Seja bem-vindo(a)!</h1>
                        <p className="text-gray-600 text-sm">Faça login na sua conta</p>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormLogin
                            register={form.register}
                            errors={form.formState.errors}
                        />
                        <div className="flex justify-center">
                            <PrimaryButton type="submit" fullWidth={true} disabled={isSubmitting}>
                                Entrar
                            </PrimaryButton>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
