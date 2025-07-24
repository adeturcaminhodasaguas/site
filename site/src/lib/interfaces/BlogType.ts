export interface BlogType {
    id: string;
    titulo: string;
    resumo: string;
    conteudo: string;
    dataPublicacao: string;
    autor: string;
    urlImagem: string;
    categoria: string;
    destaque: boolean;
    tags: string[];
}
