"use client";

import Container from "@/components/Container";
import SectionTitle from "@/components/sections/SectionTitle";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from "@/lib/zod/contactZod";
import { z } from "zod";
import ContactForm from "@/components/forms/ContactForm";
import PrimaryButton from "@/components/PrimaryButton";
import CardContact from "@/components/CardContact";
import CardRedesSociais from "@/components/CardRedesSociais";
import { showToast } from "@/components/ShowToast";
import ContactService from "@/lib/service/ContactService";
import { useState } from "react";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contato() {
    const [loading, setLoading] = useState(false);

    const { register, control, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        try {
            setLoading(true);
            const contactService = new ContactService();
            await contactService.sendContactForm(data);
            showToast("success", "Formulário enviado com sucesso!");
            reset();
        } catch (error: any) {
            console.error("Erro ao enviar formulário:", error);
            const message = error?.message || "Erro ao enviar formulário. Tente novamente mais tarde.";
            showToast("error", message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <Container>
                <div className="flex flex-col items-center justify-center py-10 px-4">
                    <SectionTitle subtitle="Estamos aqui para conectar você com as oportunidades e belezas da nossa região. Entre em contato conosco!">
                        Contato
                    </SectionTitle>
                </div>

                <div >
                    <FadeInOnScroll
                        direction="up"
                        delay={0.3}
                        className="flex flex-col-reverse lg:flex-row items-stretch justify-center gap-10 px-4 pb-16"
                    >
                        <div className="flex flex-col gap-6 w-full max-w-md">
                            <CardContact />
                            <CardRedesSociais />
                        </div>

                        <div className="w-full max-w-2xl p-6 sm:p-8 bg-white rounded-2xl shadow-md flex flex-col justify-between">
                            <h2 className="text-xl font-bold mb-4 montserrat">Formulário de Contato</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                                <ContactForm register={register} errors={errors} control={control} />
                                <PrimaryButton
                                    type="submit"
                                    className="mt-6 w-full"
                                    disabled={loading}
                                >
                                    Enviar
                                </PrimaryButton>
                            </form>
                        </div>
                    </FadeInOnScroll>
                </div>
            </Container>
        </div>
    );
}
