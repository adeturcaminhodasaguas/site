import { TourismType } from "@/lib/interfaces/TourismType";
import Image from "next/image";

import { MapPin } from "lucide-react";

type TourismProps = {
    tourism: TourismType;
}

export default function Tourism({ tourism }: TourismProps) {
    return (
        <div className="bg-background rounded-xl shadow-md overflow-hidden group cursor-pointer flex flex-col justify-between w-[520px]">

            <div className="relative w-full h-48 overflow-hidden">
                <Image
                    src={tourism.urlImagem}
                    alt={tourism.nome}
                    fill
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                <div className="absolute top-4 right-4 poppins bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-highlight">
                    <MapPin className="w-4 h-4 inline-block mr-1" />
                    {tourism.municipio.nome}
                </div>
            </div>

            <div className="p-4 flex flex-col gap-4">
                <h3 className="text-lg font-bold text-foreground montserrat group-hover:text-primary transition-colors duration-200">
                    {tourism.nome}
                </h3>

                <p className="text-sm text-foreground-secondary line-clamp-2 leading-relaxed poppins">
                    {tourism.descricao}
                </p>
            </div>



        </div>
    );
}