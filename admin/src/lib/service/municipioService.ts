import HttpClient from "../httpClient/httpClient";
import { MunicipioPaginacaoType, MunicipioSelectType, MunicipioType } from "../types/municipioType";

export default class MunicipioService {
    async listar(page: number = 0, size: number = 10): Promise<MunicipioPaginacaoType> {
        return await HttpClient.get<MunicipioPaginacaoType>(`municipio?page=${page}&size=${size}`, true);
    }

    async listarMunicipioSelect(): Promise<MunicipioSelectType[]> {
        return await HttpClient.get<MunicipioType[]>("municipio/select", true);
    }

    async salvar(data: FormData): Promise<MunicipioType> {
        return await HttpClient.postFormData<MunicipioType>("municipio", data, true);
    }

    async alterar(id: string, data: FormData): Promise<MunicipioType> {
        return await HttpClient.putFormData<MunicipioType>(`municipio/${id}`, data, true);
    }

    async excluir(id: string): Promise<void> {
        await HttpClient.delete(`municipio/${id}`, true);
    }

    async buscarPorId(id: string): Promise<MunicipioType> {
        return await HttpClient.get<MunicipioType>(`municipio/${id}` , true);
    }

    async alterarStatus(id: string): Promise<string> {
       return await HttpClient.put<string>(`municipio/status/${id}`, undefined, true);
    }
}