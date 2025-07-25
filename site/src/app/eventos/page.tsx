"use client";

import { useEffect, useState } from "react";
import Container from "@/components/Container";
import SectionTitle from "@/components/sections/SectionTitle";
import Events from "@/components/Events";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import CardSkeleton from "@/components/CardSkeleton";
import FilterNotFound from "@/components/FilterNotFound";
import InfiniteScrollLoadMore from "@/components/InfiniteScrollLoadMore";
import Filter from "@/components/Filter";
import { EventsType } from "@/lib/interfaces/EventsType";
import EventsService from "@/lib/service/EventsService";

export default function EventsPage() {
    const [events, setEvents] = useState<EventsType[]>([]);
    const [loading, setLoading] = useState(true);
    const [filteredEvents, setFilteredEvents] = useState<EventsType[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const service = new EventsService();
            const response = await service.listar();
            setEvents(response?.content || []);
            setFilteredEvents(response?.content || []);
        } catch (error) {
            console.error("Erro ao carregar eventos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

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

    const categories = Array.from(new Set(events.map(event => event.categoria)));

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
                            onFilterChange={setSelectedCategory}
                        />
                    </FadeInOnScroll>

                    <InfiniteScrollLoadMore totalItems={filteredEvents.length}>
                        {(visibleCount) =>
                            loading ? (
                                <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                    {Array.from({ length: 6 }).map((_, index) => (
                                        <CardSkeleton key={index} />
                                    ))}
                                </div>
                            ) : filteredEvents.length === 0 ? (
                                <div className="flex justify-center items-center p-10">
                                    <FilterNotFound />
                                </div>
                            ) : (
                                <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                    {filteredEvents.slice(0, visibleCount).map((event, index) => (
                                        <FadeInOnScroll
                                            key={event.id}
                                            direction="up"
                                            delay={0.2 + index * 0.1}
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
                    </InfiniteScrollLoadMore>
                </div>
            </Container>
        </div>
    );
}