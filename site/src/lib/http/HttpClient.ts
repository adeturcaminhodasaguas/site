import { ApiError } from "../interfaces/ApiType";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        let errorMessage = `Erro desconhecido. Por favor, tente novamente.`;
        try {
            const errorData = await response.json();
            if (errorData.erro) {
                errorMessage = errorData.erro;
            } else if (errorData.message) {
                errorMessage = errorData.message;
            }
        } catch {
            errorMessage = `Erro desconhecido. Por favor, tente novamente.`;
        }

        const error: ApiError = {
            message: errorMessage,
            status: response.status,
        };

        throw error;
    }
    return (await response.json()) as T;
};

const HttpClient = {
    get: async <T>(path: string): Promise<T> => {
        const response = await fetch(baseUrl + path, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        return handleResponse<T>(response);
    },
    post: async <T>(path: string, body: any): Promise<T> => {
        const response = await fetch(baseUrl + path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        });
        return handleResponse<T>(response);
    },
};

export default HttpClient;