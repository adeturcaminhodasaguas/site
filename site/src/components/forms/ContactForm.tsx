"use client";
import { FieldErrors, UseFormRegister, Controller, Control } from "react-hook-form";
import { contactSchema } from "@/lib/zod/contactZod";
import { formatarTelefone } from "../../lib/utils/MaskPhone";
import z from "zod";

type ContactFormData = z.infer<typeof contactSchema>;

type ContactFormProps = {
    register: UseFormRegister<ContactFormData>;
    errors: FieldErrors<ContactFormData>;
    control: Control<ContactFormData>;
};

export default function ContactForm({ register, errors, control }: ContactFormProps) {

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block mb-2 text-sm font-semibold poppins text-gray-700">Nome</label>
                    <input
                        type="text"
                        placeholder="Ex: João da Silva"
                        {...register("nome")}
                        className="w-full px-6 py-4 bg-background-alt rounded-full text-foreground font-medium focus:outline-none focus:ring-4 focus:ring-white/30"
                    />

                    {errors.nome && (
                        <span className={`text-sm poppins min-h-[1.5rem] block ${errors.nome ? 'text-red-500' : 'invisible'}`}>
                            {errors.nome.message}
                        </span>
                    )}
                </div>


                <div>
                    <label className="block mb-2 text-sm font-semibold poppins text-gray-700">Email</label>
                    <input
                        type="email"
                        placeholder="Ex: joao.silva@email.com"
                        {...register("email")}
                        className="w-full px-6 py-4 bg-background-alt rounded-full text-foreground font-medium focus:outline-none focus:ring-4 focus:ring-white/30"
                    />

                    {errors.email && (
                        <span className="text-red-500 text-sm poppins">
                            {errors.email.message}
                        </span>
                    )}
                </div>

            </div>
            <div className="mt-6">
                <label className="block mb-2 text-sm font-semibold poppins text-gray-700">Telefone</label>
                <Controller
                    name="telefone"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                        <input
                            type="text"
                            placeholder="(00) 00000-0000"
                            value={value || ""}
                            onChange={(e) => {
                                const apenasNumeros = e.target.value.replace(/\D/g, "");
                                const formatado = formatarTelefone(apenasNumeros);
                                onChange(formatado);
                            }}
                            ref={ref}
                            className="w-full px-6 py-4 bg-background-alt rounded-full text-foreground font-medium focus:outline-none focus:ring-4 focus:ring-white/30"
                        />
                    )}
                />
                {errors.telefone && (
                    <span className="text-red-500 text-sm poppins">
                        {errors.telefone.message}
                    </span>
                )}
            </div>
            <div className="mt-6">
                <label className="block mb-2 text-sm font-semibold poppins text-gray-700">Assunto</label>
                <input
                    type="text"
                    placeholder="Ex: Dúvida sobre eventos"
                    {...register("assunto")}
                    className="w-full px-6 py-4 bg-background-alt rounded-full text-foreground font-medium focus:outline-none focus:ring-4 focus:ring-white/30"
                />

                {errors.assunto && (
                    <span className="text-red-500 text-sm poppins">
                        {errors.assunto.message}
                    </span>
                )}

            </div>
            <div className="mt-6">
                <label className="block mb-2 text-sm font-semibold poppins text-gray-700">Mensagem</label>
                <textarea
                    rows={4}
                    placeholder="Escreva sua mensagem aqui..."
                    {...register("mensagem")}
                    className="w-full px-6 py-4 bg-background-alt rounded-2xl text-foreground font-medium focus:outline-none focus:ring-4 focus:ring-white/30"
                />

                {errors.mensagem && (
                    <span className="text-red-500 text-sm poppins">
                        {errors.mensagem.message}
                    </span>
                )}

            </div>
        </div>
    );
}