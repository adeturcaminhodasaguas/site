import HttpClient from "../httpClient/httpClient";
import { TurismoExperienciaPaginacaoType, TurismoExperienciaType } from "../types/turismoExperienciaType";

export default class TurismoExperienciaService {
    async listar(page: number = 0, size: number = 10): Promise<TurismoExperienciaPaginacaoType> {
        return await HttpClient.get<TurismoExperienciaPaginacaoType>(`turismo-experiencia?page=${page}&size=${size}`, true);
    }

    async alterarStatus(id: string): Promise<string> {
        return await HttpClient.put<string>(`turismo-experiencia/status/${id}`, undefined, true);
    }

    async salvar(data: FormData): Promise<TurismoExperienciaType> {
        return await HttpClient.postFormData<TurismoExperienciaType>("turismo-experiencia", data, true);
    }

    async alterar(id: string, data: FormData): Promise<TurismoExperienciaType> {
        return await HttpClient.putFormData<TurismoExperienciaType>(`turismo-experiencia/${id}`, data, true);
    }

    async excluir(id: string) {
        await HttpClient.delete(`turismo-experiencia/${id}`, true);
    }

    async buscarPorId(id: string): Promise<TurismoExperienciaType> {
        return await HttpClient.get<TurismoExperienciaType>(`turismo-experiencia/${id}`, true);
    }
}