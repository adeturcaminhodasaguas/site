import { MunicipioSelectType } from "./municipioType";

export interface EventoType {
    id: string;
    nome: string;
    descricao: string;
    data: Date ;
    horaInicio: string;
    horaFim: string;
    local: string;
    urlImagem: string;
    categoria: string;
    destaque: boolean;
    status: string;
    municipio: MunicipioSelectType;
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

export interface EventoPaginacaoType {
  content: EventoType[];
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