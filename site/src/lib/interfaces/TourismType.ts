import { MunicipalityType } from "./MunicipalityType";

export interface TourismType {
    id: string;
    nome: string;
    descricao: string;
    urlImagem: string;
    contato: string;
    instagram?: string;
    site?: string;
    municipio: MunicipalityType;
}