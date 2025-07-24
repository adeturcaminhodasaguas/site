import HttpClient from "../httpClient/httpClient";
import { SaboresCulturaPaginacaoType, SaboresCulturaType } from "../types/saboresCulturaType";

export default class SaboresCulturaService {
    async listar(page: number = 0, size: number = 10): Promise<SaboresCulturaPaginacaoType> {
        return await HttpClient.get<SaboresCulturaPaginacaoType>(`sabor-cultura?page=${page}&size=${size}`, true);
    }

    async buscarPorId(id: string): Promise<SaboresCulturaType> {
        return await HttpClient.get<SaboresCulturaType>(`sabor-cultura/${id}`, true);
    }

    async excluir(id: string): Promise<void> {
        await HttpClient.delete(`sabor-cultura/${id}`, true);
    }

    async salvar(data: FormData): Promise<SaboresCulturaType> {
        return await HttpClient.postFormData<SaboresCulturaType>("sabor-cultura", data, true);
    }

    async alterar(id: string, data: FormData): Promise<SaboresCulturaType> {
        return await HttpClient.putFormData<SaboresCulturaType>(`sabor-cultura/${id}`, data, true);
    }

    async alterarStatus(id: string): Promise<string> {
        return await HttpClient.put<string>(`sabor-cultura/status/${id}`, undefined, true);
    }
}