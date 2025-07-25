
import HttpClient from "../http/HttpClient";
import { MunicipalityType } from "../interfaces/MunicipalityType";
import { PaginacaoType } from "../interfaces/PaginacaoType";

export default class MunicipalityService {
    async listar(): Promise<PaginacaoType<MunicipalityType>> {
        const response = await HttpClient.get<PaginacaoType<MunicipalityType>>("municipio/web/listar?page=0&size=6");
        return response;
    }
}