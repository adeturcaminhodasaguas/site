"use client";

import { useEffect, useState } from "react";
import Container from "@/components/Container";
import SectionTitle from "@/components/sections/SectionTitle";
import BlogCard from "@/components/BlogCard";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import CardSkeleton from "@/components/CardSkeleton";
import FilterNotFound from "@/components/FilterNotFound";
import InfiniteScrollLoadMore from "@/components/InfiniteScrollLoadMore";
import Filter from "@/components/Filter";
import { BlogType } from "@/lib/interfaces/BlogType";
import BlogService from "@/lib/service/BlogService";


export default function Blog() {
    const [blogs, setBlogs] = useState<BlogType[]>([]);
    const [loading, setLoading] = useState(true);
    const [filteredBlogs, setFilteredBlogs] = useState<BlogType[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const service = new BlogService();
            const response = await service.listar();
            setBlogs(response);
            setFilteredBlogs(response);
        } catch (error) {
            console.error("Erro ao carregar blogs:", error);
            // Para demonstração, vou criar dados mock
            const mockBlogs: BlogType[] = [
                {
                    id: "1",
                    titulo: "Descobrindo as Belezas Naturais do Oeste do Paraná",
                    resumo: "Explore as maravilhas naturais da nossa região, desde cachoeiras cristalinas até trilhas ecológicas que conectam você com a natureza.",
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
                    destaque: false,
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
                    destaque: false,
                    tags: ["eventos", "cultura", "festivais"]
                }
            ];
            setBlogs(mockBlogs);
            setFilteredBlogs(mockBlogs);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    useEffect(() => {
        if (selectedCategory === "") {
            setFilteredBlogs(blogs);
        } else {
            const filtered = blogs.filter(blog => blog.categoria === selectedCategory);
            setFilteredBlogs(filtered);
        }
    }, [selectedCategory, blogs]);

    const handleBlogClick = (blogId: string) => {
        // Implementar navegação para página de detalhes do blog
        console.log("Clicou no blog:", blogId);
    };

    const categories = Array.from(new Set(blogs.map(blog => blog.categoria)));

    return (
        <div>
            <div className="flex flex-col items-center justify-center py-10 px-4">
                <SectionTitle subtitle="Fique por dentro das novidades, dicas e histórias da nossa região">
                    Blog
                </SectionTitle>
            </div>

            <Container>
                <div className="py-8">
                    <FadeInOnScroll direction="up" delay={0.2}>
                        <Filter
                            filters={categories}
                            selectedFilter={selectedCategory}
                            onFilterChange={setSelectedCategory}
                        />
                    </FadeInOnScroll>

                    <InfiniteScrollLoadMore totalItems={filteredBlogs.length}>
                        {(visibleCount) =>
                            loading ? (
                                <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                    {Array.from({ length: 6 }).map((_, index) => (
                                        <CardSkeleton key={index} />
                                    ))}
                                </div>
                            ) : filteredBlogs.length === 0 ? (
                                <div className="flex justify-center items-center p-10">
                                    <FilterNotFound />
                                </div>
                            ) : (
                                <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                    {filteredBlogs.slice(0, visibleCount).map((blog, index) => (
                                        <FadeInOnScroll
                                            key={blog.id}
                                            direction="up"
                                            delay={0.2 + index * 0.1}
                                            className="flex justify-center transition-all duration-300 transform hover:-translate-y-2"
                                        >
                                            <BlogCard
                                                blog={blog}
                                                onClick={() => handleBlogClick(blog.id)}
                                            />
                                        </FadeInOnScroll>
                                    ))}
                                </div>
                            )
                        }
                    </InfiniteScrollLoadMore>
                </div>
            </Container>
        </div>
    );
}