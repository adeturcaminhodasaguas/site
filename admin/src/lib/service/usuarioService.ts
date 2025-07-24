import HttpClient from "../httpClient/httpClient";
import { UsuarioPaginacaoType, UsuarioType } from "../types/usuarioType";

export default class UsuarioService {
    async listar(page: number = 0, size: number = 10): Promise<UsuarioPaginacaoType> {
        return await HttpClient.get<UsuarioPaginacaoType>(`usuario?page=${page}&size=${size}`, true);
    }

    async alterarStatus(id: string): Promise<string> {
        return await HttpClient.put<string>(`usuario/status/${id}`, undefined, true);
    }

    async salvar(data: any): Promise<UsuarioType> {
        return await HttpClient.post<UsuarioType>("usuario", data, true);
    }

    async alterar(id: string, data: any): Promise<UsuarioType> {
        return await HttpClient.put<UsuarioType>(`usuario/${id}`, data, true);
    }

    async excluir(id: string) {
        await HttpClient.delete(`usuario/${id}`, true);
    }

    async buscarPorId(id: string): Promise<UsuarioType> {
        return await HttpClient.get<UsuarioType>(`usuario/${id}`, true);
    }
}