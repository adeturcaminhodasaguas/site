
import HttpClient from "../http/HttpClient";
import { MunicipalityType } from "../interfaces/MunicipalityType";
import { PaginacaoType } from "../interfaces/PaginacaoType";

export default class MunicipalityService {
    async listar(page: number = 0, size: number = 6): Promise<PaginacaoType<MunicipalityType>> {
        const response = await HttpClient.get<PaginacaoType<MunicipalityType>>(`municipio/web/listar?page=${page}&size=${size}`);
        return response;
    }
}