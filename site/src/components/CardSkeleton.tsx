"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function CardSkeleton() {
    return (
        <div className="flex flex-col w-full max-w-[400px] h-[373px] mx-auto bg-white rounded-lg shadow">
            <Skeleton className="h-[150px] w-full rounded-t-lg bg-foreground-secondary/40" />
            <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-3/4 bg-foreground-secondary/40" />
                <Skeleton className="h-4 w-1/2 bg-foreground-secondary/40" />
                <Skeleton className="h-4 w-full bg-foreground-secondary/40" />
            </div>
            <div className="p-4">
                <Skeleton className="px-6 py-3 text-base h-12 min-w-[160px] bg-foreground-secondary/40" />
            </div>
        </div>
    );
}
