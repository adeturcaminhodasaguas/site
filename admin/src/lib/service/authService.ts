import HttpClient from "../httpClient/httpClient";
import { LoginForm } from "../schemas/schemas";
import { AuthType } from "../types/authType";

export default class AuthService{
    async login(data: LoginForm): Promise<AuthType> {
        return await HttpClient.post<AuthType>("auth/login", data);
    }
}