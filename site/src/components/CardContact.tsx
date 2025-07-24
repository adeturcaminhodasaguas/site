import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function CardContact() {
    return (
        <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-md">
                <h2 className="text-xl mb-4  font-bold text-foreground montserrat">
                    Entre em Contato
                </h2>

                <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-foreground/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-semibold poppins text-foreground mb-1">Endereço</h4>
                            <p className="text-muted-foreground poppins">
                               Rua Exemplo, 123 - Centro, Cidade - UF
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-foreground/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <Phone className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-semibold poppins text-foreground mb-1">Telefones</h4>
                            <p className="text-muted-foreground poppins">
                                (44) 3234-5678
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-foreground/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-semibold poppins text-foreground mb-1">E-mail</h4>
                            <p className="text-muted-foreground poppins">
                                contato@igr-oeste.org.br
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-foreground/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <Clock className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-semibold poppins text-foreground mb-1">Horário de Funcionamento</h4>
                            <p className="text-muted-foreground poppins">
                                Segunda a Sexta: 8h às 17h<br />
                                Sábado: 8h às 12h
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}