"use client";

import { useEffect, useState } from "react";
import Container from "@/components/Container";
import SectionTitle from "@/components/sections/SectionTitle";
import Tourism from "@/components/Tourism";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import CardSkeleton from "@/components/CardSkeleton";
import FilterNotFound from "@/components/FilterNotFound";
import InfiniteScrollWithPagination from "@/components/InfiniteScrollWithPagination";
import Filter from "@/components/Filter";
import Modal from "@/components/Modal";
import DetailsTourism from "@/components/DetailsTourism";
import { TourismType } from "@/lib/interfaces/TourismType";
import TourismService from "@/lib/service/TourismService";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

export default function Turismo() {
    const [filteredTourism, setFilteredTourism] = useState<TourismType[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedTourism, setSelectedTourism] = useState<TourismType>({} as TourismType);
    const [modalOpen, setModalOpen] = useState(false);
    const [municipalities, setMunicipalities] = useState<string[]>([]);

    const {
        items: tourism,
        loading,
        hasMore,
        loadMore,
        refresh,
    } = useInfiniteScroll({
        fetchFunction: async (page: number, size: number) => {
            const service = new TourismService();
            return await service.listar(page, size);
        },
        initialPageSize: 6,
    });

    // Atualizar municípios quando turismo carregar
    useEffect(() => {
        const uniqueMunicipalities = Array.from(new Set(tourism.map(item => item.municipio.nome)));
        setMunicipalities(uniqueMunicipalities);
    }, [tourism]);

    // Filtrar turismo por município
    useEffect(() => {
        if (selectedCategory === "") {
            setFilteredTourism(tourism);
        } else {
            const filtered = tourism.filter(item => item.municipio.nome === selectedCategory);
            setFilteredTourism(filtered);
        }
    }, [selectedCategory, tourism]);

    const handleTourismClick = (id: string) => {
        const selected = tourism.find((item) => item.id === id);
        if (selected) {
            setSelectedTourism(selected);
            setModalOpen(true);
        }
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        // Se aplicar filtro, não carregamos mais páginas (limitação do filtro client-side)
        // Para filtro server-side, você modificaria o fetchFunction no hook
    };

    return (
        <div>
            <div className="flex flex-col items-center justify-center py-10 px-4">
                <SectionTitle subtitle="Explore nossos destinos únicos, descubra experiências inesquecíveis e conecte-se com a autenticidade de cada local.">
                    Turismo & Experiência
                </SectionTitle>
            </div>

            <Container>
                <div className="py-8">
                    <FadeInOnScroll direction="up" delay={0.2}>
                        <Filter
                            filters={municipalities}
                            selectedFilter={selectedCategory}
                            onFilterChange={handleCategoryChange}
                        />
                    </FadeInOnScroll>

                    {/* Se houver filtro ativo, não usamos paginação infinita */}
                    {selectedCategory ? (
                        <div className="py-8">
                            {filteredTourism.length === 0 ? (
                                <div className="flex justify-center items-center p-10">
                                    <FilterNotFound />
                                </div>
                            ) : (
                                <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                    {filteredTourism.map((item, index) => (
                                        <FadeInOnScroll
                                            key={item.id}
                                            direction="up"
                                            delay={0.2 + (index % 6) * 0.1}
                                            className="flex justify-center transition-all duration-300 transform hover:-translate-y-2"
                                        >
                                            <button
                                                onClick={() => handleTourismClick(item.id)}
                                                className="w-full h-full flex justify-center items-center"
                                                type="button"
                                            >
                                                <Tourism tourism={item} />
                                            </button>
                                        </FadeInOnScroll>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <InfiniteScrollWithPagination
                            items={tourism}
                            loading={loading}
                            hasMore={hasMore}
                            onLoadMore={loadMore}
                        >
                            {(items) =>
                                loading && items.length === 0 ? (
                                    <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                        {Array.from({ length: 6 }).map((_, index) => (
                                            <CardSkeleton key={index} />
                                        ))}
                                    </div>
                                ) : items.length === 0 ? (
                                    <div className="flex justify-center items-center p-10">
                                        <FilterNotFound />
                                    </div>
                                ) : (
                                    <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                        {items.map((item, index) => (
                                            <FadeInOnScroll
                                                key={item.id}
                                                direction="up"
                                                delay={0.2 + (index % 6) * 0.1}
                                                className="flex justify-center transition-all duration-300 transform hover:-translate-y-2"
                                            >
                                                <button
                                                    onClick={() => handleTourismClick(item.id)}
                                                    className="w-full h-full flex justify-center items-center"
                                                    type="button"
                                                >
                                                    <Tourism tourism={item} />
                                                </button>
                                            </FadeInOnScroll>
                                        ))}
                                    </div>
                                )
                            }
                        </InfiniteScrollWithPagination>
                    )}

                    <Modal
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        title="Detalhes do Turismo & Experiência"
                    >
                        <DetailsTourism tourism={selectedTourism} />
                    </Modal>
                </div>
            </Container>
        </div>
    );
}