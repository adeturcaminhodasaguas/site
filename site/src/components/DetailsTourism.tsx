"use client";

import ImageCarousel from "./ImageCarousel";
import Contact from "./Contact";
import { TourismType } from "@/lib/interfaces/TourismType";

type DetailsTourismProps = {
    tourism: TourismType;
};

export default function DetailsTourism({ tourism }: DetailsTourismProps) {

    if (!tourism || !tourism.id) {
        return (
            <div className="p-6 text-center text-foreground-secondary">
                <p>Nenhum turismo selecionado</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex flex-col lg:flex-row lg:gap-8 p-6">
                <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
                    <ImageCarousel
                        images={[tourism.urlImagem]}
                        alt={tourism.nome}
                        autoplay={true}
                        autoplayDelay={4000}
                    />
                </div>

                <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6">
                    <div>
                        <h2 className="text-3xl font-bold text-foreground poppins mb-2">
                            {tourism.nome}
                        </h2>
                        <div className="w-16 h-1 bg-primary rounded-full"></div>
                    </div>

                    <div>
                        <p className="text-foreground-secondary poppins leading-relaxed text-lg">
                            {tourism.descricao}
                        </p>
                    </div>

                    <Contact
                        instagram={tourism.instagram}
                        site={tourism.site}
                        contato={tourism.contato}
                    />
                </div>
            </div>
        </div>
    );
}
