import HttpClient from "../http/HttpClient";
import { PaginacaoType } from "../interfaces/PaginacaoType";

// Interface para Sabores & Culturas - ajuste conforme sua interface real
export interface SaboresCulturaType {
    id: string;
    nome: string;
    descricao: string;
    destaque: string[];
    municipio: {
        id: string;
        nome: string;
    };
    status: string;
}

export default class SaboresCulturaService {
    async listar(page: number = 0, size: number = 6): Promise<PaginacaoType<SaboresCulturaType>> {
        const response = await HttpClient.get<PaginacaoType<SaboresCulturaType>>(`sabor-cultura/web/listar?page=${page}&size=${size}`);
        return response;
    }
}
