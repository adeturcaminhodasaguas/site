"use client";

import { MunicipalityType } from "@/lib/interfaces/MunicipalityType";
import Image from "next/image";

type MunicipalityProps = {
    municipality: MunicipalityType;
};

export default function Municipality({ municipality }: MunicipalityProps) {
    return (
        <div className="bg-background rounded-xl shadow-md overflow-hidden group cursor-pointer flex flex-col justify-between w-[520px]">

            <div className="relative w-full h-48 overflow-hidden">
                <Image
                    src={municipality.brasao}
                    alt={municipality.nome}
                    fill
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <div className="p-4 flex flex-col gap-3">
                <h3 className="text-lg font-bold text-foreground montserrat group-hover:text-primary transition-colors duration-200">
                    {municipality.nome}
                </h3>

                <p className="text-sm text-foreground-secondary line-clamp-2 leading-relaxed poppins">
                    {municipality.descricao}
                </p>

                <div className="flex items-center justify-end text-xs text-foreground-secondary mt-2">
                    <div className="flex items-center space-x-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {municipality.destaque?.length || 0} fotos
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
