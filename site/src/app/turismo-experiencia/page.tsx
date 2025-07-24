"use client";

import { useEffect, useState } from "react";
import Container from "@/components/Container";
import SectionTitle from "@/components/sections/SectionTitle";
import Tourism from "@/components/Tourism";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import CardSkeleton from "@/components/CardSkeleton";
import FilterNotFound from "@/components/FilterNotFound";
import InfiniteScrollLoadMore from "@/components/InfiniteScrollLoadMore";
import Filter from "@/components/Filter";
import Modal from "@/components/Modal";
import DetailsTourism from "@/components/DetailsTourism";
import { TourismType } from "@/lib/interfaces/TourismType";
import TourismService from "@/lib/service/TourismService";

export default function Turismo() {
    const [tourism, setTourism] = useState<TourismType[]>([]);
    const [loading, setLoading] = useState(true);
    const [filteredTourism, setFilteredTourism] = useState<TourismType[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedTourism, setSelectedTourism] = useState<TourismType>({} as TourismType);
    const [modalOpen, setModalOpen] = useState(false);

    const fetchTourism = async () => {
        try {
            setLoading(true);
            const service = new TourismService();
            const response = await service.listar();
            setTourism(response?.content);
            setFilteredTourism(response?.content);
        } catch (error) {
            console.error("Erro ao carregar turismo:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTourism();
    }, []);

    useEffect(() => {
        if (selectedCategory === "") {
            setFilteredTourism(tourism);
        } else {
            const filtered = tourism.filter(item =>
                item.municipio.nome === selectedCategory
            );
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

    const municipalities = Array.from(new Set(tourism.map(item => item.municipio.nome)));

    return (
        <div>
            <div className="flex flex-col items-center justify-center py-10 px-4">
                <SectionTitle subtitle="Empresas locais que trabalham para proporcionar experiências únicas e inesquecíveis em nossa região, conectando visitantes com as belezas naturais e culturais.">
                    Turismo & Experiências
                </SectionTitle>
            </div>

            <Container>
                <div className="py-8">
                    <FadeInOnScroll direction="up" delay={0.2}>
                        <Filter
                            filters={municipalities}
                            selectedFilter={selectedCategory}
                            onFilterChange={setSelectedCategory}
                        />
                    </FadeInOnScroll>

                    <InfiniteScrollLoadMore totalItems={filteredTourism.length}>
                        {(visibleCount) =>
                            loading ? (
                                <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                    {Array.from({ length: 6 }).map((_, index) => (
                                        <CardSkeleton key={index} />
                                    ))}
                                </div>
                            ) : filteredTourism.length === 0 ? (
                                <div className="flex justify-center items-center p-10">
                                    <FilterNotFound />
                                </div>
                            ) : (
                                <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                    {filteredTourism.slice(0, visibleCount).map((item, index) => (
                                        <FadeInOnScroll
                                            key={item.id}
                                            direction="up"
                                            delay={0.2 + index * 0.1}
                                            className="flex justify-center transition-all duration-300 transform hover:-translate-y-2"
                                        >
                                            <button
                                                className="w-full h-full flex justify-center items-center"
                                                onClick={() => handleTourismClick(item.id)}
                                                type="button"
                                            >
                                                <Tourism tourism={item} />
                                            </button>
                                        </FadeInOnScroll>
                                    ))}
                                </div>
                            )
                        }
                    </InfiniteScrollLoadMore>

                    <Modal
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        title="Detalhes do Turismo & Experiências"
                    >
                        <DetailsTourism tourism={selectedTourism} />
                    </Modal>
                </div>
            </Container>
        </div>
    );
}