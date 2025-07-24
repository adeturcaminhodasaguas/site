import HttpClient from "../http/HttpClient";

export default class FilterService {
    async listar<T>(route: string): Promise<T> {
        const response = await HttpClient.get<T>(route);
        return response;
    }
}
