import { UsuarioType } from "./usuarioType";

export interface AuthType {
    token: string;
    usuario: UsuarioType;
}