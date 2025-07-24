'use client';

import Image from "next/image";
import Container from "../Container";
import SectionTitle from "./SectionTitle";
import FadeInOnScroll from "../animation/FadeInOnScroll";
import { ArrowRight } from "lucide-react";

export default function SectionAbout() {
    return (
        <div className="w-full py-24 lg:py-32 flex items-center">
            <Container>
                <FadeInOnScroll
                    direction="up"
                    delay={0.2}
                    duration={0.8}
                    className="flex flex-col"
                >
                    <SectionTitle subtitle="Conheça a história, missão e valores que guiam a IGR na construção de um futuro próspero para nossa região.">
                        Sobre Nós
                    </SectionTitle>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-10">
                        <div className="space-y-6">
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground montserrat">
                                Unidos pelo Desenvolvimento Regional
                            </h3>
                            <p className="text-foreground-secondary poppins leading-relaxed text-base md:text-lg">
                                A IGR nasceu em 2018 da visão compartilhada de 14 municípios que acreditavam no poder da cooperação.
                                Reconhecendo que juntos somos mais fortes, nossos prefeitos e lideranças se uniram para criar uma
                                organização que pudesse promover o desenvolvimento sustentável de toda a região.
                            </p>
                            <p className="text-foreground-secondary poppins leading-relaxed text-base md:text-lg">
                                Desde então, temos trabalhado incansavelmente para fortalecer os laços entre nossos municípios,
                                promover o turismo regional, valorizar nossa cultura e criar oportunidades de crescimento econômico
                                que beneficiem todos os nossos habitantes.
                            </p>
                            <div className="flex items-center space-x-2 poppins text-primary font-semibold">
                                <span>Saiba mais sobre nossos projetos</span>
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="relative w-full max-w-[500px] mx-auto">
                            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop"
                                    alt="Reunião IGR"
                                    height={800}
                                    width={800}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-24 h-24 sm:w-32 sm:h-32 bg-highlight rounded-3xl flex items-center justify-center shadow-xl">
                                <div className="text-center poppins text-white text-xs sm:text-base">
                                    <div className="text-xl sm:text-2xl font-bold montserrat">6+</div>
                                    <div className="">Anos de</div>
                                    <div className="">Cooperação</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeInOnScroll>
            </Container>
        </div>
    );
}
