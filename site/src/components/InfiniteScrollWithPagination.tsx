"use client";

import React, { ReactNode, useEffect } from "react";
import CardSkeleton from "@/components/CardSkeleton";

type InfiniteScrollWithPaginationProps<T> = {
    items: T[];
    children: (items: T[]) => ReactNode;
    loading: boolean;
    hasMore: boolean;
    onLoadMore: () => void;
    skeletonCount?: number;
    loadingTriggerOffset?: number;
};

export default function InfiniteScrollWithPagination<T>({
    items,
    children,
    loading,
    hasMore,
    onLoadMore,
    skeletonCount = 6,
    loadingTriggerOffset = 100,
}: InfiniteScrollWithPaginationProps<T>) {
    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = window.innerHeight;

        const nearBottom = scrollTop + clientHeight >= scrollHeight - loadingTriggerOffset;

        if (nearBottom && !loading && hasMore) {
            onLoadMore();
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore]);

    return (
        <>
            {children(items)}

            {loading && (
                <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {Array.from({ length: skeletonCount }).map((_, index) => (
                        <CardSkeleton key={`loading-skeleton-${index}`} />
                    ))}
                </div>
            )}

            {!hasMore && items.length > 0 && (
                <div className="flex justify-center items-center py-8">
                    <p className="text-gray-500 text-center">
                        Todos os itens foram carregados.
                    </p>
                </div>
            )}
        </>
    );
}
