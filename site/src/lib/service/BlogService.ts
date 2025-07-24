import HttpClient from "../http/HttpClient";
import { BlogType } from "../interfaces/BlogType";

export default class BlogService {
    async listarBlogsDestaque(): Promise<BlogType[]> {
        const response = await HttpClient.get<BlogType[]>("blog/destaque");
        return response;
    }

    async listar(): Promise<BlogType[]> {
        const response = await HttpClient.get<BlogType[]>("blog");
        return response;
    }

    async buscarPorId(id: string): Promise<BlogType> {
        const response = await HttpClient.get<BlogType>(`blog/${id}`);
        return response;
    }

    async buscarPorCategoria(categoria: string): Promise<BlogType[]> {
        const response = await HttpClient.get<BlogType[]>(`blog/categoria/${categoria}`);
        return response;
    }
}
