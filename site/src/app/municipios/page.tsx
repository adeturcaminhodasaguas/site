"use client";

import { useState } from "react";
import Container from "@/components/Container";
import SectionTitle from "@/components/sections/SectionTitle";
import Municipality from "@/components/Municipality";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import CardSkeleton from "@/components/CardSkeleton";
import FilterNotFound from "@/components/FilterNotFound";
import InfiniteScrollWithPagination from "@/components/InfiniteScrollWithPagination";
import Modal from "@/components/Modal";
import DetailsMunicipality from "@/components/DetailsMunicipality";
import { MunicipalityType } from "@/lib/interfaces/MunicipalityType";
import MunicipalityService from "@/lib/service/MunicipalityService";
import { showToast } from "@/components/ShowToast";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

export default function MunicipiosPage() {
    const [selectedMunicipality, setSelectedMunicipality] = useState<MunicipalityType>({} as MunicipalityType);
    const [modalOpen, setModalOpen] = useState(false);

    const {items: municipality,loading,hasMore,loadMore} = useInfiniteScroll({
        fetchFunction: async (page: number, size: number) => {
            const service = new MunicipalityService();
            return await service.listar(page, size);
        },
        initialPageSize: 6,
    });

    const handleMunicipalityClick = (id: string) => {
        const selected = municipality.find((item) => item.id === id);
        if (selected) {
            setSelectedMunicipality(selected);
            setModalOpen(true);
            return;
        }
        showToast("error", "Município não encontrado.");
    };

    return (
        <div>
            <div className="flex flex-col items-center justify-center py-10 px-4">
                <SectionTitle subtitle="Cada cidade da nossa região possui sua própria identidade, riquezas e histórias que se entrelaçam para formar um território único e próspero.">
                    Nossos Municípios
                </SectionTitle>
            </div>

            <Container>
                <div className="py-8">
                    <InfiniteScrollWithPagination
                        items={municipality}
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
                                                onClick={() => handleMunicipalityClick(item.id)}
                                                className="w-full h-full flex justify-center items-center"
                                                type="button"
                                            >
                                                <Municipality
                                                    municipality={item}
                                                />
                                            </button>
                                        </FadeInOnScroll>
                                    ))}
                                </div>
                            )
                        }
                    </InfiniteScrollWithPagination>

                    <Modal
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        title="Detalhes do Município"
                    >
                        <DetailsMunicipality municipality={selectedMunicipality} />
                    </Modal>
                </div>
            </Container>
        </div>
    );
}