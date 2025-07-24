import HttpClient from "../http/HttpClient";
import { TourismType } from "../interfaces/TourismType";

export default class TourismService {
    async listar(): Promise<TourismType[]> {
        const response = await HttpClient.get<TourismType[]>("turismo-experiencia/web/listar?page=0&size=6");
        return response;
    }
}