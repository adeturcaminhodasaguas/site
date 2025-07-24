'use client';

import Container from "../Container";
import SectionTitle from "./SectionTitle";
import { LeafletMap } from "../LeafletMap";
import { MapContainer } from "../MapContainer";
import FadeInOnScroll from "../animation/FadeInOnScroll";
import { Car, Bus, Plane, Clock, Phone } from "lucide-react";

const transportOptions = [
    {
        icon: Car,
        title: 'De Carro',
        description: 'Acesso fácil pelas principais rodovias do Paraná',
        details: [
            'BR-272: Principal via de acesso à região',
            'PR-323: Conecta com Maringá e região',
            'BR-487: Liga ao interior do estado',
            'Estacionamento gratuito disponível'
        ],
        time: '2-4 horas de Curitiba',
        color: '#2D2F93'
    },
    {
        icon: Bus,
        title: 'De Ônibus',
        description: 'Linhas regulares conectam a região com todo o Paraná',
        details: [
            'Terminal Rodoviário de Cruzeiro do Oeste',
            'Linhas diretas de Curitiba, Maringá e Cascavel',
            'Empresas: Catarinense, Garcia, Viação Ouro Verde',
            'Horários regulares durante toda a semana'
        ],
        time: '3-5 horas de Curitiba',
        color: '#0079C1'
    },
    {
        icon: Plane,
        title: 'De Avião',
        description: 'Aeroportos próximos facilitam o acesso à região',
        details: [
            'Aeroporto de Maringá (120km)',
            'Aeroporto de Cascavel (150km)',
            'Aeroporto de Londrina (180km)',
            'Transfer disponível mediante agendamento'
        ],
        time: '1-2 horas de voo + transfer',
        color: '#F7B733'
    }
];

export default function SectionGetThere() {
    return (
        <section className="py-20 ">
            <Container>
                <FadeInOnScroll direction="up" className="mb-20">
                    <SectionTitle subtitle="Localização estratégica no oeste do Paraná, acessível por diversas rotas e meios de transporte.">
                        Como Chegar Até Nós
                    </SectionTitle>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {transportOptions.map((option) => (
                            <div
                                key={option.title}
                                className="bg-background rounded-2xl p-8 shadow-lg group transition-transform duration-300 hover:scale-[1.02]"
                            >
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                                    style={{ backgroundColor: `${option.color}15` }}
                                >
                                    <option.icon className="w-8 h-8" style={{ color: option.color }} />
                                </div>

                                <h3 className="text-2xl font-bold poppins text-foreground mb-3 montserrat">
                                    {option.title}
                                </h3>

                                <p className="text-foreground-secondary poppins mb-4 leading-relaxed">
                                    {option.description}
                                </p>

                                <div className="flex items-center space-x-2 mb-6">
                                    <Clock className="w-5 h-5 text-foreground" />
                                    <span className="font-semibold text-foreground poppins">{option.time}</span>
                                </div>

                                <ul className="space-y-2">
                                    {option.details.map((detail, idx) => (
                                        <li key={idx} className="flex items-start space-x-2">
                                            <div className="w-2 h-2 bg-highlight rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-foreground-secondary poppins text-sm">{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </FadeInOnScroll>

                <FadeInOnScroll direction="up" delay={0.2}>
                    <div className="rounded-3xl w-full p-8 md:p-12 shadow-lg mb-16">
                        <div className="text-center mb-8">
                            <h3 className="text-3xl  font-bold text-foreground mb-4 montserrat">
                                Localização Central
                            </h3>
                            <p className="text-foreground-secondary poppins text-lg">
                                Cruzeiro do Oeste é o ponto central da IGR, facilitando o acesso a todos os municípios associados.
                            </p>
                        </div>

                        <MapContainer className="w-full">
                            <LeafletMap />
                        </MapContainer>
                    </div>
                </FadeInOnScroll>

                <FadeInOnScroll direction="up" delay={0.4}>
                    <div className="bg-gradient-to-r  from-primary to-secondary rounded-2xl p-8 text-white text-center">
                        <Phone className="w-12 h-12 mx-auto mb-4 text-highlight" />
                        <h3 className="text-2xl font-bold mb-4 montserrat">Precisa de Ajuda com Direções?</h3>
                        <p className="text-lg opacity-90 mb-6 poppins">
                            Nossa equipe está pronta para ajudar você a planejar sua viagem até nossa região.
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                            <div className="flex items-center space-x-2">
                                <Phone className="w-5 h-5" />
                                <span className="font-semibold poppins">(44) 3234-5678</span>
                            </div>
                            <div className="text-highlight">•</div>
                            <div>
                                <span className="font-semibold poppins">contato@igr-oeste.org.br</span>
                            </div>
                        </div>
                    </div>
                </FadeInOnScroll>
            </Container>
        </section>
    );
}
