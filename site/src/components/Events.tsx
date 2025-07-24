"use client";

import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import { EventsType } from "@/lib/interfaces/EventsType";
import formatLabel from "@/lib/helper/formatLabel";

type EventsProps = {
    events: EventsType
};

export default function Events({ events }: EventsProps) {
    return (
        <div className="bg-background rounded-xl shadow-md overflow-hidden group cursor-pointer flex flex-col justify-between w-[520px]">

            <div className="relative w-full h-48 overflow-hidden">
                <Image
                    src={events.urlImagem}
                    alt={events.nome}
                    fill
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                <div className="absolute top-4 right-4 poppins bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-highlight">
                    <MapPin className="w-4 h-4 inline-block mr-1" />
                    {formatLabel(events.categoria)}
                </div>
            </div>

            <div className="p-6 flex flex-col justify-between flex-1">
                <h3 className="text-lg font-bold text-foreground mb-3 montserrat group-hover:text-primary transition-colors duration-200">
                    {events.nome}
                </h3>

                <p className="text-sm text-foreground-secondary line-clamp-3 leading-relaxed poppins mb-4">
                    {events.descricao}
                </p>

                <div className="space-y-2 text-sm text-foreground-secondary mt-auto">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-highlight" />
                        <span>{new Date(events.data).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-highlight" />
                        <span>{new Date(`1970-01-01T${events.horaInicio}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(`1970-01-01T${events.horaFim}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-highlight" />
                        <span>{events.local}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
