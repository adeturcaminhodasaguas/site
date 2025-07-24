import FilterService from "../service/FilterService";

export const getFilter = (route: string): Promise<string[]> => {
    const service = new FilterService();
    return service.listar<string[]>(route);
};