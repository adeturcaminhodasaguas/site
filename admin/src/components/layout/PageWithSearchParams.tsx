"use client";

import { Suspense, ReactNode } from "react";

interface PageWithSearchParamsProps {
    children: ReactNode;
    fallback?: ReactNode;
}

export function PageWithSearchParams({
    children,
    fallback = <div className="flex justify-center items-center min-h-screen">Carregando...</div>
}: PageWithSearchParamsProps) {
    return (
        <Suspense fallback={fallback}>
            {children}
        </Suspense>
    );
}
