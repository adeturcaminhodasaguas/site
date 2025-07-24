import { ApiError } from "../types/apiErrorType";
import Cookie from 'js-cookie';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const token = () => {
    return Cookie.get('turismo_token');
};

const headers = (privado?: boolean) => {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (privado) {
        headers["Authorization"] = `Bearer ${token()}`;
    }
    return headers;
};

const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        let errorMessage = 'Erro desconhecido. Por favor, tente novamente.';
        try {
            const errorData = await response.json();

            if (errorData.message) {
                errorMessage = errorData.message;
            } else if (errorData.erro) {
                errorMessage = errorData.erro;
            }
        } catch (e) {
            console.error('Erro ao processar resposta de erro:', e);
        }

        if(response.status === 401 || response.status === 403){
            Cookie.remove('turismo_token');
            window.location.href = '/auth/login';
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
    get: async <T>(path: string, privado?: boolean): Promise<T> => {
        const response = await fetch(baseUrl + path, {
            method: "GET",
            headers: headers(privado),
        });
        return handleResponse<T>(response);
    },
    post: async <T>(path: string, body: any, privado?: boolean): Promise<T> => {
        const response = await fetch(baseUrl + path, {
            method: "POST",
            headers: headers(privado),
            body: JSON.stringify(body),
        });
        return handleResponse<T>(response);
    },
    put: async <T>(path: string, body?: any, privado?: boolean): Promise<T> => {
        const response = await fetch(baseUrl + path, {
            method: "PUT",
            headers: headers(privado),
            body: body ? JSON.stringify(body) : undefined,
        });
        return handleResponse<T>(response);
    },
    postFormData: async <T>(path: string, body: any, privado?: boolean): Promise<T> => {
        const formDataHeaders: Record<string, string> = {};
        if (privado) {
            formDataHeaders["Authorization"] = `Bearer ${token()}`;
        }
        const response = await fetch(baseUrl + path, {
            method: "POST",
            body: body,
            headers: formDataHeaders,
        });
        return handleResponse<T>(response);
    },
    putFormData: async <T>(path: string, body: any, privado?: boolean): Promise<T> => {
        const formDataHeaders: Record<string, string> = {};
        if (privado) {
            formDataHeaders["Authorization"] = `Bearer ${token()}`;
        }
        const response = await fetch(baseUrl + path, {
            method: "PUT",
            body: body,
            headers: formDataHeaders,
        });
        return handleResponse<T>(response);
    },
    delete: async <T>(path: string, privado?: boolean) => {
        const deleteHeaders: Record<string, string> = {};
        if (privado) {
            deleteHeaders["Authorization"] = `Bearer ${token()}`;
        }
        const response = await fetch(baseUrl + path, {
            method: "DELETE",
            headers: deleteHeaders,
        });
        return handleResponse<T>(response);
    },
};

export default HttpClient;
