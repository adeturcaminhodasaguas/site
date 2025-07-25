import HttpClient from "../http/HttpClient";
import FlavorsType from "../interfaces/FlavorsType";
import { PaginacaoType } from "../interfaces/PaginacaoType";

export default class FlavorsService {
    async listar(): Promise<PaginacaoType<FlavorsType>> {
        const response = await HttpClient.get<PaginacaoType<FlavorsType>>("sabor-cultura/web/listar?page=0&size=6");
        return response;
    }
}