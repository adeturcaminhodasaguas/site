export interface MunicipioType {
    id: string;
    nome: string;
    descricao: string;
    brasao: string;
    destaque: string[];
    instagram: string;
    site: string;
    contato: string;
    usuarioId?: string;
    status: string;
}

export interface MunicipioSelectType {
    id: string;
    nome: string;
}


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

export interface MunicipioPaginacaoType {
  content: MunicipioType[];
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