import HttpClient from "../http/HttpClient";
import { NewsletterType } from "../interfaces/NewsletterType";

export default class NewsletterService {
    async subscribe(email: string): Promise<NewsletterType> {
        const response = await HttpClient.post<NewsletterType>("newsletter", { email: email });
        return response;
    }
}