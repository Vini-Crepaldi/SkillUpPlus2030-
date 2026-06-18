import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Usuario, AreaInteresse } from '../models/Usuario';
import { authService } from '../services/authService';
interface AuthContextData {
  usuario: Usuario | null;
  carregando: boolean;
  login: (email: string, senha: string) => Promise<void>;
  cadastrar: (
    nome: string,
    email: string,
    senha: string,
    area: AreaInteresse,
  ) => Promise<void>;
  atualizarArea: (area: AreaInteresse) => Promise<void>;
  logout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);
  useEffect(() => {
    (async () => {
      const sessao = await authService.sessaoAtual();
      setUsuario(sessao);
      setCarregando(false);
    })();
  }, []);
  async function login(email: string, senha: string) {
    const u = await authService.login(email, senha);
    setUsuario(u);
  }
  async function cadastrar(
    nome: string,
    email: string,
    senha: string,
    area: AreaInteresse,
  ) {
    const novo = new Usuario(nome, email, senha, area);
    await authService.cadastrar(novo);
    await login(email, senha);
  }
  async function atualizarArea(area: AreaInteresse) {
    if (!usuario) return;
    const atualizado = usuario.comArea(area);
    await authService.atualizarPerfil(atualizado);
    setUsuario(atualizado);
  }
  async function logout() {
    await authService.logout();
    setUsuario(null);
  }
  return (
    <AuthContext.Provider
      value={{
        usuario,
        carregando,
        login,
        cadastrar,
        atualizarArea,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth(): AuthContextData {
  return useContext(AuthContext);
}
