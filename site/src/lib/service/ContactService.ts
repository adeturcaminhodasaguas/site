
import { z } from "zod";
import { contactSchema } from "../zod/contactZod";
import HttpClient from "../http/HttpClient";

type ContactFormData = z.infer<typeof contactSchema>;

export default class ContactService {
    async sendContactForm(data: ContactFormData): Promise<void> {
        return await HttpClient.post("email", data);
    }
}