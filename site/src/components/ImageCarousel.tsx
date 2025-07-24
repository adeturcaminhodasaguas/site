"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

type ImageCarouselProps = {
    images: string[];
    alt: string;
    autoplay?: boolean;
    autoplayDelay?: number;
};

export default function ImageCarousel({
    images,
    alt,
    autoplay = true,
    autoplayDelay = 4000,
}: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(autoplay);

    useEffect(() => {
        if (!isAutoPlaying || images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, autoplayDelay);

        return () => clearInterval(interval);
    }, [currentIndex, isAutoPlaying, images.length, autoplayDelay]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(autoplay);

    if (!images || images.length === 0) {
        return (
            <div className="w-full h-80 bg-background-alt rounded-lg flex items-center justify-center">
                <div className="text-center text-foreground-secondary">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nenhuma imagem disponível</p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="relative w-full h-80 rounded-lg overflow-hidden bg-background-alt"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Main Image */}
            <div className="relative w-full h-full">
                <Image
                    src={images[currentIndex]}
                    alt={`${alt} - Imagem ${currentIndex + 1}`}
                    fill
                    className="object-contain transition-opacity duration-500"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                    }}
                />
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                    >
                        <ChevronLeft className="w-5 h-5 text-foreground" />
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                    >
                        <ChevronRight className="w-5 h-5 text-foreground" />
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                index === currentIndex
                                    ? "bg-primary scale-125"
                                    : "bg-primary/50 hover:bg-primary/80"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
