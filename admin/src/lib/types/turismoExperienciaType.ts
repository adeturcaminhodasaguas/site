import { MunicipioType } from "./municipioType";

export interface TurismoExperienciaType {
    id: string;
    nome: string;
    descricao: string;
    urlImagem: string;
    contato: string;
    instagram: string;
    site: string;
    municipio: MunicipioType;
    status: string;
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

export interface TurismoExperienciaPaginacaoType {
      content: TurismoExperienciaType[];
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