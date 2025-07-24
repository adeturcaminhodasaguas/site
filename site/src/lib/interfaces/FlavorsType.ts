import { MunicipalityType } from "./MunicipalityType";

export default interface FlavorsType {
    id: string;
    nome: string;
    descricao: string;
    urlImagem: string;
    contato: string;
    instagram: string;
    site: string;
    municipio: MunicipalityType;
}