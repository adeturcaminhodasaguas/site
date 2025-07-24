import HttpClient from "../http/HttpClient";
import FlavorsType from "../interfaces/FlavorsType";

export default class FlavorsService {
    async listar(): Promise<FlavorsType[]> {
        const response = await HttpClient.get<FlavorsType[]>("sabor-cultura/web/listar?page=0&size=6");
        return response;
    }
}