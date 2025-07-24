"use client";

import { useEffect, useState } from "react";
import Container from "@/components/Container";
import SectionTitle from "@/components/sections/SectionTitle";
import Flavors from "@/components/Flavors";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import CardSkeleton from "@/components/CardSkeleton";
import FilterNotFound from "@/components/FilterNotFound";
import InfiniteScrollLoadMore from "@/components/InfiniteScrollLoadMore";
import Filter from "@/components/Filter";
import Modal from "@/components/Modal";
import DetailsFlavors from "@/components/DetailsFlavors";
import PrimaryButton from "@/components/PrimaryButton";
import FlavorsType from "@/lib/interfaces/FlavorsType";
import FlavorsService from "@/lib/service/FlavorsService";
import Link from "next/link";

export default function Sabores() {
    const [flavors, setFlavors] = useState<FlavorsType[]>([]);
    const [loading, setLoading] = useState(true);
    const [filteredFlavors, setFilteredFlavors] = useState<FlavorsType[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedFlavors, setSelectedFlavors] = useState<FlavorsType>({} as FlavorsType);
    const [modalOpen, setModalOpen] = useState(false);

    const fetchFlavors = async () => {
        try {
            setLoading(true);
            const service = new FlavorsService();
            const response = await service.listar();
            setFlavors(response?.content);
            setFilteredFlavors(response?.content);
        } catch (error) {
            console.error("Erro ao carregar sabores:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFlavors();
    }, []);

    useEffect(() => {
        if (selectedCategory === "") {
            setFilteredFlavors(flavors);
        } else {
            const filtered = flavors.filter(flavor =>
                flavor.municipio.nome === selectedCategory
            );
            setFilteredFlavors(filtered);
        }
    }, [selectedCategory, flavors]);

    const handleFlavorClick = (id: string) => {
        const selected = flavors.find((item) => item.id === id);
        if (selected) {
            setSelectedFlavors(selected);
            setModalOpen(true);
        }
    };

    const municipalities = Array.from(new Set(flavors.map(flavor => flavor.municipio.nome)));

    return (
        <div>
            <div className="flex flex-col items-center justify-center py-10 px-4">
                <SectionTitle subtitle="Descubra os sabores autênticos e a rica cultura que fazem da nossa região um lugar único e especial.">
                    Sabores & Cultura
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

                    <InfiniteScrollLoadMore totalItems={filteredFlavors.length}>
                        {(visibleCount) =>
                            loading ? (
                                <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                    {Array.from({ length: 6 }).map((_, index) => (
                                        <CardSkeleton key={index} />
                                    ))}
                                </div>
                            ) : filteredFlavors.length === 0 ? (
                                <div className="flex justify-center items-center p-10">
                                    <FilterNotFound />
                                </div>
                            ) : (
                                <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                    {filteredFlavors.slice(0, visibleCount).map((flavor, index) => (
                                        <FadeInOnScroll
                                            key={flavor.id}
                                            direction="up"
                                            delay={0.2 + index * 0.1}
                                            className="flex justify-center transition-all duration-300 transform hover:-translate-y-2"
                                        >
                                            <button
                                                className="w-full h-full flex justify-center items-center"
                                                onClick={() => handleFlavorClick(flavor.id)}
                                                type="button"
                                            >
                                                <Flavors flavors={flavor} />
                                            </button>
                                        </FadeInOnScroll>
                                    ))}
                                </div>
                            )
                        }
                    </InfiniteScrollLoadMore>


                    {/**<FadeInOnScroll
                        direction="up"
                        delay={0.2}
                        className="flex justify-center items-center mt-8"
                    > 
                            <PrimaryButton>
                                <Link href="/galeria">Galeria de Fotos</Link>
                            </PrimaryButton>
                            
                    </FadeInOnScroll>*/}

                    <Modal
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        title="Detalhes do Sabores & Cultura"
                    >
                        <DetailsFlavors flavors={selectedFlavors} />
                    </Modal>
                </div>
            </Container>
        </div>
    );
}