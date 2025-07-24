"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie';
import { AuthType } from '@/lib/types/authType';
import { UsuarioType } from '@/lib/types/usuarioType';
import { useFormDialog } from '@/hooks/use-form-dialog';

export type UserRole = 'ADMIN';

export interface User {
  id: string;
  nome: string;
  email: string;
  role: UserRole;
  token?: string;
  tipo?: string;
}

interface AuthContextType {
  user: UsuarioType | null;
  isLoading: boolean;
  login: (usuario: AuthType) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UsuarioType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useRouter();
  const { toast } = useFormDialog();

  useEffect(() => {
    const storedUser = localStorage.getItem('turismo_usuario');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('turismo_usuario');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (usuario: AuthType) => {
    setIsLoading(true);
    try {
      setUser(usuario.usuario);
      localStorage.setItem('turismo_usuario', JSON.stringify(usuario.usuario));
      Cookie.set('turismo_token', usuario.token, { expires: 3 });
      toast("success", `Bem-vindo, ${usuario.usuario.nome}!`);

      if (usuario.usuario.tipo === "admin") {
        navigate.push('/');
      }

    } catch (error) {
      toast("error", error instanceof Error ? error.message : 'Erro ao fazer login');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('turismo_usuario');
    Cookie.remove('turismo_token');
    navigate.push('/auth/login');
    toast("info", 'Você saiu do sistema');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};