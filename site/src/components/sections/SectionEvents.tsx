'use client';

import Container from "../Container";
import Events from "../Events";
import PrimaryButton from "../PrimaryButton";
import SectionTitle from "./SectionTitle";
import FadeInOnScroll from "../animation/FadeInOnScroll";
import Newsletter from "../Newsletter";
import { useEffect, useState } from "react";
import { EventsType } from "@/lib/interfaces/EventsType";
import EventsService from "@/lib/service/EventsService";
import Link from "next/link";
import InfiniteScrollLoadMore from "../InfiniteScrollLoadMore";
import FilterNotFound from "../FilterNotFound";
import CardSkeleton from "../CardSkeleton";
import { showToast } from "../ShowToast";

export default function SectionEvents() {
    const [events, setEvents] = useState<EventsType[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const service = new EventsService();
            const response = await service.listarEventosDestaque();
            setEvents(response);
        } catch (error: any) {
            showToast("error", error.message || "Erro ao carregar eventos");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="flex items-center py-16">
            <Container>
                <div>
                    <div className="flex flex-col items-center gap-10 justify-between">
                        <FadeInOnScroll direction="up" delay={0.2}>
                            <SectionTitle subtitle="Descubra os eventos que celebram nossa cultura, promovem negócios e fortalecem os laços entre nossos municípios.">
                                Participe dos Nossos Eventos
                            </SectionTitle>
                        </FadeInOnScroll>
                    </div>

                    <InfiniteScrollLoadMore totalItems={events.length}>
                        {(visibleCount) =>
                            loading ? (
                                <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                    {Array.from({ length: 3 }).map((_, index) => (
                                        <CardSkeleton key={index} />
                                    ))}
                                </div>
                            ) : events.length === 0 ? (
                                <div className="flex justify-center items-center p-10">
                                    <FilterNotFound />
                                </div>
                            ) : (
                                <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                    {events.slice(0, visibleCount).map((event, index) => (
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

                    <div className="flex justify-center mt-8">
                        <FadeInOnScroll direction="up" delay={0.5}>
                            <div className="flex justify-center mt-8">
                                <PrimaryButton>
                                    <Link href="/eventos">Ver Todos os Eventos</Link>
                                </PrimaryButton>
                            </div>
                        </FadeInOnScroll>
                    </div>
                    <Newsletter />
                </div>
            </Container>
        </div>
    );
}
