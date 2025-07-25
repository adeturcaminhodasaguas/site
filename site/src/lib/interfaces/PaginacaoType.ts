export interface PageableInfo {
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface SortInfo {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface PaginacaoType<T> {
      content: T[];
      pageable: PageableInfo;
      totalElements: number;
      totalPages: number;
      last: boolean;
      size: number;
      number: number;
      sort: SortInfo;
      first: boolean;
      numberOfElements: number;
      empty: boolean;
}