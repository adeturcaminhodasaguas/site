'use client';

import Container from "../Container";
import Testimonial from "../Testimonial";
import SectionTitle from "./SectionTitle";
import FadeInOnScroll from "../animation/FadeInOnScroll";

export default function SectionTestimonial() {
    const testimonials = [
        {
            id: 1,
            name: 'Maria Santos',
            role: 'Empresária do Turismo',
            location: 'São Paulo, SP',
            image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            rating: 5,
            text: 'A região oeste do Paraná me surpreendeu completamente! A hospitalidade das pessoas, a beleza natural e a rica cultura local tornaram nossa viagem inesquecível. Já estamos planejando voltar com mais turistas.',
            highlight: 'Hospitalidade excepcional'
        },
        {
            id: 2,
            name: 'João Oliveira',
            role: 'Fotógrafo de Natureza',
            location: 'Curitiba, PR',
            image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            rating: 5,
            text: 'Como fotógrafo, encontrei na região cenários únicos e uma biodiversidade impressionante. O Rio Paraná oferece paisagens deslumbrantes e a cooperação entre os municípios facilita muito o trabalho de documentação.',
            highlight: 'Cenários únicos'
        },
        {
            id: 3,
            name: 'Ana Carolina',
            role: 'Chef de Cozinha',
            location: 'Maringá, PR',
            image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            rating: 5,
            text: 'Os produtos artesanais da região são de uma qualidade excepcional! As geleias, queijos e mel que encontrei aqui elevaram o padrão do meu restaurante. A tradição culinária local é um tesouro.',
            highlight: 'Produtos excepcionais'
        }
    ];

    return (
        <div className="flex items-center py-16">
            <Container>
                <FadeInOnScroll direction="up" delay={0.2}>
                    <SectionTitle subtitle="Depoimentos">
                        O que dizem sobre nós
                    </SectionTitle>
                </FadeInOnScroll>

                <div className="flex flex-col items-center justify-center mt-10 gap-8">
                    <FadeInOnScroll
                        direction="up"
                        delay={0.3}
                        className="flex justify-center "
                    >
                        <Testimonial
                            testimonials={testimonials}
                        />
                    </FadeInOnScroll>

                </div>
            </Container>
        </div>
    );
}
