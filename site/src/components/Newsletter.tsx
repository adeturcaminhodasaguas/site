import { ArrowRight, Calendar } from "lucide-react";
import FadeInOnScroll from "./animation/FadeInOnScroll";
import { toast, ToasterProps } from "sonner"
import { useRef } from "react";
import NewsletterService from "@/lib/service/NewsletterService";
import { showToast } from "./ShowToast";

export default function Newsletter() {
    const email = useRef<HTMLInputElement>(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailValue = email.current?.value;

        if (!isValidEmail(emailValue)) {
            showInvalidEmailToast();
            return;
        }

        try {
            await subscribeToNewsletter(emailValue!);
            showSuccessToast();
            clearEmailInput();
        } catch {
            showErrorToast();
        }
    };

    const isValidEmail = (email: string | undefined): boolean => {
        return !!email && emailRegex.test(email);
    };

    const subscribeToNewsletter = async (email: string): Promise<void> => {
        const newsletterService = new NewsletterService();
        await newsletterService.subscribe(email);
    };

    const clearEmailInput = (): void => {
        if (email.current) {
            email.current.value = "";
        }
    };

    const showInvalidEmailToast = (): void => {
        showToast("error", "Por favor, insira um e-mail válido.");
    };

    const showSuccessToast = (): void => {
        showToast("success", "Inscrição realizada com sucesso! Fique atento aos nossos e-mails.");
    };

    const showErrorToast = (): void => {
        showToast("error", "Ocorreu um erro ao se inscrever. Por favor, tente novamente.");
    };

    return (
        <FadeInOnScroll direction="up" delay={0.6} className="mt-12 text-center w-full">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 md:p-12 text-white text-center">
                <Calendar className="w-16 h-16 mx-auto mb-6 text-highlight" />
                <h3 className="text-3xl font-bold mb-4 montserrat">Não Perca Nenhum Evento!</h3>
                <p className="text-xl opacity-90 mb-8 poppins max-w-2xl mx-auto">
                    Cadastre-se em nossa newsletter e receba informações sobre todos os eventos da região em primeira mão.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 max-w-md mx-auto">
                    <input
                        ref={email}
                        type="email"
                        placeholder="Seu melhor e-mail"
                        className="w-full px-6 py-4 bg-background rounded-full text-foreground font-medium focus:outline-none focus:ring-4 focus:ring-white/30"
                    />
                    <button
                        className="w-full md:w-auto bg-highlight cursor-pointer text-foreground px-8 py-4 rounded-full font-bold hover:bg-highlight/90 transition-all duration-300 flex items-center justify-center space-x-2"
                        onClick={handleSubmit}
                    >
                        <span>Cadastrar</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </FadeInOnScroll>
    )
}