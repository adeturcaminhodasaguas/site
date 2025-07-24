"use client";

import { MunicipalityType } from "@/lib/interfaces/MunicipalityType";
import ImageCarousel from "./ImageCarousel";
import Contact from "./Contact";

type DetailsMunicipalityProps = {
    municipality: MunicipalityType;
};

export default function DetailsMunicipality({ municipality }: DetailsMunicipalityProps) {

    if (!municipality || !municipality.id) {
        return (
            <div className="p-6 text-center text-foreground-secondary">
                <p>Nenhum município selecionado</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex flex-col lg:flex-row lg:gap-8 p-6">
                <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
                    <ImageCarousel
                        images={municipality.destaque}
                        alt={municipality.nome}
                        autoplay={true}
                        autoplayDelay={4000}
                    />
                </div>

                <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6">
                    <div>
                        <h2 className="text-3xl font-bold text-foreground poppins mb-2">
                            {municipality.nome}
                        </h2>
                        <div className="w-16 h-1 bg-primary rounded-full"></div>
                    </div>

                    <div>
                        <p className="text-foreground-secondary poppins leading-relaxed text-lg">
                            {municipality.descricao}
                        </p>
                    </div>

                    <Contact
                        instagram={municipality.instagram}
                        site={municipality.site}
                        contato={municipality.contato}
                    />
                </div>
            </div>
        </div>
    );
}
