"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

type PaginacaoProps = {
    totalPage: number;
};

function PaginacaoContent({ totalPage }: PaginacaoProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPage) {
            router.push(`?page=${page}`, { scroll: false });
        }
    };

    const renderPages = () => {
        const pages = [];
        for (let i = 1; i <= totalPage; i++) {
            pages.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        onClick={() => handlePageChange(i)}
                        isActive={i === currentPage}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }
        return pages;
    };

    return (
        <Pagination>
            <PaginationContent className="flex items-center gap-2">
                <PaginationPrevious
                    onClick={() => {
                        if (currentPage > 1) {
                            handlePageChange(currentPage - 1);
                        }
                    }}
                    aria-disabled={currentPage === 1}
                    style={currentPage === 1 ? { pointerEvents: "none", opacity: 0.5 } : {}}
                >
                    Anterior
                </PaginationPrevious>
                {renderPages()}
                <PaginationNext
                    onClick={() => {
                        if (currentPage < totalPage) {
                            handlePageChange(currentPage + 1);
                        }
                    }}
                    aria-disabled={currentPage === totalPage}
                    style={currentPage === totalPage ? { pointerEvents: "none", opacity: 0.5 } : {}}
                >
                    Próximo
                </PaginationNext>
            </PaginationContent>
        </Pagination>
    );
}

export function Paginacao({ totalPage }: PaginacaoProps) {
    return (
        <Suspense fallback={<div className="flex justify-center py-4">Carregando...</div>}>
            <PaginacaoContent totalPage={totalPage} />
        </Suspense>
    );
}