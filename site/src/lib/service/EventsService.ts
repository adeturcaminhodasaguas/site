import HttpClient from "../http/HttpClient";
import { EventsType } from "../interfaces/EventsType";

export default class EventsService {
    async listarEventosDestaque(): Promise<EventsType[]> {
        const response = await HttpClient.get<EventsType[]>("evento/destaque");
        return response;
    }

    async listar(): Promise<EventsType[]> {
        const response = await HttpClient.get<EventsType[]>("evento");
        return response;
    }
}