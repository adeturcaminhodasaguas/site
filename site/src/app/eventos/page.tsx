"use client";

import { useEffect, useState } from "react";
import Container from "@/components/Container";
import SectionTitle from "@/components/sections/SectionTitle";
import Events from "@/components/Events";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import CardSkeleton from "@/components/CardSkeleton";
import FilterNotFound from "@/components/FilterNotFound";
import InfiniteScrollWithPagination from "@/components/InfiniteScrollWithPagination";
import Filter from "@/components/Filter";
import { EventsType } from "@/lib/interfaces/EventsType";
import EventsService from "@/lib/service/EventsService";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

export default function EventsPage() {
    const [filteredEvents, setFilteredEvents] = useState<EventsType[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [categories, setCategories] = useState<string[]>([]);

    const {
        items: events,
        loading,
        hasMore,
        loadMore,
        refresh,
    } = useInfiniteScroll({
        fetchFunction: async (page: number, size: number) => {
            const service = new EventsService();
            return await service.listar(page, size);
        },
        initialPageSize: 6,
    });

    // Atualizar categorias quando eventos carregarem
    useEffect(() => {
        const uniqueCategories = Array.from(new Set(events.map(event => event.categoria)));
        setCategories(uniqueCategories);
    }, [events]);

    // Filtrar eventos por categoria
    useEffect(() => {
        if (selectedCategory === "") {
            setFilteredEvents(events);
        } else {
            const filtered = events.filter(event => event.categoria === selectedCategory);
            setFilteredEvents(filtered);
        }
    }, [selectedCategory, events]);

    const handleEventClick = (eventId: string) => {
        // Implementar navegação para página de detalhes do evento
        console.log("Clicou no evento:", eventId);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        // Se aplicar filtro, não carregamos mais páginas (limitação do filtro client-side)
        // Para filtro server-side, você modificaria o fetchFunction no hook
    };

    return (
        <div>
            <div className="flex flex-col items-center justify-center py-10 px-4">
                <SectionTitle subtitle="Descubra os eventos que celebram nossa cultura, promovem negócios e fortalecem os laços entre nossos municípios.">
                    Participe dos Nossos Eventos
                </SectionTitle>
            </div>

            <Container>
                <div className="py-8">
                    <FadeInOnScroll direction="up" delay={0.2}>
                        <Filter
                            filters={categories}
                            selectedFilter={selectedCategory}
                            onFilterChange={handleCategoryChange}
                        />
                    </FadeInOnScroll>

                    {/* Se houver filtro ativo, não usamos paginação infinita */}
                    {selectedCategory ? (
                        <div className="py-8">
                            {filteredEvents.length === 0 ? (
                                <div className="flex justify-center items-center p-10">
                                    <FilterNotFound />
                                </div>
                            ) : (
                                <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                    {filteredEvents.map((event, index) => (
                                        <FadeInOnScroll
                                            key={event.id}
                                            direction="up"
                                            delay={0.2 + (index % 6) * 0.1}
                                            className="flex justify-center transition-all duration-300 transform hover:-translate-y-2"
                                        >
                                            <Events
                                                events={event}
                                            />
                                        </FadeInOnScroll>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <InfiniteScrollWithPagination
                            items={events}
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
                                        {items.map((event, index) => (
                                            <FadeInOnScroll
                                                key={event.id}
                                                direction="up"
                                                delay={0.2 + (index % 6) * 0.1}
                                                className="flex justify-center transition-all duration-300 transform hover:-translate-y-2"
                                            >
                                                <Events
                                                    events={event}
                                                />
                                            </FadeInOnScroll>
                                        ))}
                                    </div>
                                )
                            }
                        </InfiniteScrollWithPagination>
                    )}
                </div>
            </Container>
        </div>
    );
}