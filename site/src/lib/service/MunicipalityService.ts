
import HttpClient from "../http/HttpClient";
import { MunicipalityType } from "../interfaces/MunicipalityType";

export default class MunicipalityService {
    async listar(): Promise<MunicipalityType[]> {
        const response = await HttpClient.get<MunicipalityType[]>("municipio/web/listar?page=0&size=6");
        return response;
    }
}