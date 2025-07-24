'use client';

import { useEffect, useState } from "react";
import Container from "../Container";
import BlogCard from "../BlogCard";
import PrimaryButton from "../PrimaryButton";
import SectionTitle from "./SectionTitle";
import FadeInOnScroll from "../animation/FadeInOnScroll";
import { BlogType } from "@/lib/interfaces/BlogType";
import BlogService from "@/lib/service/BlogService";
import Link from "next/link";

export default function SectionBlog() {
    const [blogs, setBlogs] = useState<BlogType[]>([]);

    const fetchBlogs = async () => {
        try {
            const service = new BlogService();
            const response = await service.listarBlogsDestaque();
            setBlogs(response.slice(0, 3)); // Mostrar apenas 3 blogs em destaque
        } catch (error) {
            console.error("Erro ao carregar blogs:", error);
            // Para demonstração, vou criar dados mock
            const mockBlogs: BlogType[] = [
                {
                    id: "1",
                    titulo: "Descobrindo as Belezas Naturais do Oeste do Paraná",
                    resumo: "Explore as maravilhas naturais da nossa região, desde cachoeiras cristalinas até trilhas ecológicas.",
                    conteudo: "Conteúdo completo do blog...",
                    dataPublicacao: "2024-01-15",
                    autor: "Maria Silva",
                    urlImagem: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg",
                    categoria: "turismo",
                    destaque: true,
                    tags: ["natureza", "ecoturismo", "trilhas"]
                },
                {
                    id: "2",
                    titulo: "Gastronomia Regional: Sabores que Contam História",
                    resumo: "Conheça os pratos típicos e a rica tradição culinária que faz do Oeste do Paraná um destino gastronômico único.",
                    conteudo: "Conteúdo completo do blog...",
                    dataPublicacao: "2024-01-10",
                    autor: "João Santos",
                    urlImagem: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
                    categoria: "gastronomia",
                    destaque: true,
                    tags: ["culinária", "tradição", "cultura"]
                },
                {
                    id: "3",
                    titulo: "Eventos Culturais: Celebrando Nossa Identidade",
                    resumo: "Participe dos festivais e eventos que celebram a rica cultura e tradições da nossa região.",
                    conteudo: "Conteúdo completo do blog...",
                    dataPublicacao: "2024-01-05",
                    autor: "Ana Costa",
                    urlImagem: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg",
                    categoria: "cultura",
                    destaque: true,
                    tags: ["eventos", "cultura", "festivais"]
                }
            ];
            setBlogs(mockBlogs);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleBlogClick = (blogId: string) => {
        // Implementar navegação para página de detalhes do blog
        console.log("Clicou no blog:", blogId);
    };

    return (
        <div className="flex items-center py-16">
            <Container>
                <div className="flex flex-col items-center gap-10 justify-between">
                    <FadeInOnScroll direction="up" delay={0.2}>
                        <SectionTitle subtitle="Fique por dentro das novidades, dicas e histórias da nossa região">
                            Blog & Notícias
                        </SectionTitle>
                    </FadeInOnScroll>

                    <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        {blogs.map((blog, index) => (
                            <FadeInOnScroll
                                key={blog.id}
                                direction="up"
                                delay={0.3 + index * 0.1}
                                className="flex justify-center transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <BlogCard
                                    blog={blog}
                                    onClick={() => handleBlogClick(blog.id)}
                                />
                            </FadeInOnScroll>
                        ))}
                    </div>

                    <FadeInOnScroll direction="up" delay={0.6}>
                        <Link href="/blog">
                            <PrimaryButton variant="outline" size="lg">
                                Ver Todos os Posts
                            </PrimaryButton>
                        </Link>
                    </FadeInOnScroll>
                </div>
            </Container>
        </div>
    );
}
