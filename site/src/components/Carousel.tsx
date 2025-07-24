"use client"

import { useRef } from "react"
import Autoplay from "embla-carousel-autoplay"
import Image, { StaticImageData } from "next/image"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

import ImageCarousel from "../../public//carousel1.png";
import ImageCarousel2 from "../../public//carousel2.png";
import ImageCarousel3 from "../../public//carousel3.png";
import { ArrowDown } from "lucide-react"

export default function CarouselComponent() {
    const images: StaticImageData[] = [
        ImageCarousel,
        ImageCarousel2,
        ImageCarousel3
    ];

    const plugin = useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    );

    return (
        <div className="relative w-full overflow-hidden ">
            <Carousel
                plugins={[plugin.current]}
                className="w-full h-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent className="h-full">
                    {images.map((image, index) => (
                        <CarouselItem key={index} className="w-full h-full relative">
                            <Image
                                src={image}
                                alt={`Carousel Image ${index + 1}`}
                                width={1920}
                                height={780}
                                className="object-cover w-full h-full"
                                priority
                            />
                            <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-2 sm:px-4  ">
                <h2 className="text-background poppins font-bold mb-2 sm:mb-4 text-base xs:text-lg sm:text-2xl md:text-4xl lg:text-[70px] leading-tight drop-shadow-md">
                    EXPERIMENTE O MELHOR DA NOSSA REGIÃO
                </h2>
                <p className="text-background font-extralight poppins text-xs sm:text-sm md:text-base lg:text-xl max-w-xs sm:max-w-2xl md:max-w-4xl mb-2 sm:mb-6 drop-shadow">
                    Conheça as riquezas culturais, os sabores autênticos, as tradições e as experiências únicas dos nossos municípios.
                    Uma viagem pelos produtos, histórias e destinos que representam o verdadeiro espírito da nossa terra.
                </p>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <ArrowDown className="w-6 h-6 text-white/70" />
            </div>
        </div>
    );
}
