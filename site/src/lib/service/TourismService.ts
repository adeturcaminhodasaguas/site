import HttpClient from "../http/HttpClient";
import { PaginacaoType } from "../interfaces/PaginacaoType";
import { TourismType } from "../interfaces/TourismType";

export default class TourismService {
    async listar(page: number = 0, size: number = 6): Promise<PaginacaoType<TourismType>> {
        const response = await HttpClient.get<PaginacaoType<TourismType>>(`turismo-experiencia/web/listar?page=${page}&size=${size}`);
        return response;
    }
}