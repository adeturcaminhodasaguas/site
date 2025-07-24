import HttpClient from "../httpClient/httpClient";
import { EventoPaginacaoType, EventoType } from "../types/EventoType";
import { MunicipioSelectType } from "../types/municipioType";

export default class EventoService {
    async listar(page: number = 0, size: number = 10): Promise<EventoPaginacaoType> {
        return await HttpClient.get<EventoPaginacaoType>(`evento?page=${page}&size=${size}`, true);
    }

    async listarMunicipioSelect(): Promise<MunicipioSelectType[]> {
        return await HttpClient.get<MunicipioSelectType[]>("municipio/select", true);
    }

    async salvar(data: FormData): Promise<EventoType> {
        return await HttpClient.postFormData<EventoType>("evento", data, true);
    }

    async alterar(id: string, data: FormData): Promise<EventoType> {
        return await HttpClient.putFormData<EventoType>(`evento/${id}`, data, true);
    }

    async excluir(id: string): Promise<void> {
        await HttpClient.delete(`evento/${id}`, true);
    }

    async buscarPorId(id: string): Promise<EventoType> {
        return await HttpClient.get<EventoType>(`evento/${id}`, true);
    }

    async alterarStatus(id: string): Promise<string> {
        return await HttpClient.put<string>(`evento/status/${id}`, undefined, true);
    }

    async listarCategorias(): Promise<string[]> {
        return await HttpClient.get<string[]>("evento/categorias", true);
    }
}