import HttpClient from "../http/HttpClient";
import { EventsType } from "../interfaces/EventsType";
import { PaginacaoType } from "../interfaces/PaginacaoType";

export default class EventsService {
    async listarEventosDestaque(): Promise<EventsType[]> {
        const response = await HttpClient.get<EventsType[]>("evento/web/listar/destaque");
        return response;
    }

    async listar(): Promise<PaginacaoType<EventsType>> {
        const response = await HttpClient.get<PaginacaoType<EventsType>>("evento/web/listar?page=0&size=6");
        return response;
    }
}