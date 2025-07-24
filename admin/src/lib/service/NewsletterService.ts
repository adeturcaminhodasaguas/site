import HttpClient from "../httpClient/httpClient";
import { NewsletterPaginacaoType } from "../types/NewsletterType";

export default class NewsletterService {
    async listar(page: number = 0, size: number = 10): Promise<NewsletterPaginacaoType> {
        const response = await HttpClient.get<NewsletterPaginacaoType>(`newsletter?page=${page}&size=${size}`, true);
        return response;
    }

    async alterarStatus(id: string): Promise<string> {
        return await HttpClient.put<string>(`newsletter/status/${id}`, undefined, true);
    }

    async excluir(id: string): Promise<string> {
        return await HttpClient.delete<string>(`newsletter/${id}`, true);
    }
}