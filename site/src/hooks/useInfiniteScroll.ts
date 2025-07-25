import { useState, useEffect, useCallback } from 'react';

interface PaginationInfo {
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    number: number;
    size: number;
}

interface UseInfiniteScrollProps<T> {
    fetchFunction: (page: number, size: number) => Promise<{
        content: T[];
        totalElements: number;
        totalPages: number;
        first: boolean;
        last: boolean;
        number: number;
        size: number;
    }>;
    initialPageSize?: number;
}

interface UseInfiniteScrollReturn<T> {
    items: T[];
    loading: boolean;
    hasMore: boolean;
    loadMore: () => void;
    refresh: () => void;
    pagination: PaginationInfo;
}

export default function useInfiniteScroll<T>({
    fetchFunction,
    initialPageSize = 6,
}: UseInfiniteScrollProps<T>): UseInfiniteScrollReturn<T> {
    const [items, setItems] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [pagination, setPagination] = useState<PaginationInfo>({
        totalElements: 0,
        totalPages: 0,
        first: true,
        last: true,
        number: 0,
        size: initialPageSize,
    });

    const loadData = useCallback(async (page: number, isRefresh = false) => {
        if (loading) return;

        setLoading(true);
        try {
            const response = await fetchFunction(page, initialPageSize);

            setPagination({
                totalElements: response.totalElements,
                totalPages: response.totalPages,
                first: response.first,
                last: response.last,
                number: response.number,
                size: response.size,
            });

            if (isRefresh || page === 0) {
                setItems(response.content);
            } else {
                setItems(prev => [...prev, ...response.content]);
            }
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        } finally {
            setLoading(false);
        }
    }, [fetchFunction, initialPageSize, loading]);

    const loadMore = useCallback(() => {
        if (!pagination.last && !loading) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            loadData(nextPage);
        }
    }, [currentPage, pagination.last, loading, loadData]);

    const refresh = useCallback(() => {
        setCurrentPage(0);
        setItems([]);
        loadData(0, true);
    }, [loadData]);

    useEffect(() => {
        loadData(0, true);
    }, []);

    return {
        items,
        loading,
        hasMore: !pagination.last,
        loadMore,
        refresh,
        pagination,
    };
}
