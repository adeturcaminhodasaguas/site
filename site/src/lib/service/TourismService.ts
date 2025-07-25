import HttpClient from "../http/HttpClient";
import { PaginacaoType } from "../interfaces/PaginacaoType";
import { TourismType } from "../interfaces/TourismType";

export default class TourismService {
    async listar(): Promise<PaginacaoType<TourismType>> {
        const response = await HttpClient.get<PaginacaoType<TourismType>>("turismo-experiencia/web/listar?page=0&size=6");
        return response;
    }
}