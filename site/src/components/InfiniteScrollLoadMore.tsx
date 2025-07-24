"use client";

import React, { ReactNode, useEffect, useState } from "react";
import CardSkeleton from "@/components/CardSkeleton";

type InfiniteScrollLoadMoreProps = {
    children: (visibleCount: number) => ReactNode;
    totalItems: number;
    step?: number;
    skeletonCount?: number;
};

export default function InfiniteScrollLoadMore({
    children,
    totalItems,
    step = 6,
    skeletonCount = 6,
}: InfiniteScrollLoadMoreProps) {
    const [visibleCount, setVisibleCount] = useState(step);
    const [isLoading, setIsLoading] = useState(false);

    const loadMoreItems = () => {
        setIsLoading(true);
        setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + step, totalItems));
            setIsLoading(false);
        }, 1000);
    };

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = window.innerHeight;

        const nearBottom = scrollTop + clientHeight >= scrollHeight - 100;

        if (nearBottom && !isLoading && visibleCount < totalItems) {
            loadMoreItems();
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLoading, visibleCount, totalItems]);

    return (
        <>
            {children(visibleCount)}

            {isLoading && (
                <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {Array.from({ length: skeletonCount }).map((_, index) => (
                        <CardSkeleton key={index} />
                    ))}
                </div>
            )}
        </>
    );
}
