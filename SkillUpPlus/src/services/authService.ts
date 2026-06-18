import { storageService } from './storageService';
import { Usuario } from '../models/Usuario';
const CHAVE_USUARIOS = '@skillup:usuarios';
const CHAVE_SESSAO = '@skillup:sessao';
export const authService = {
  async listarUsuarios(): Promise<Usuario[]> {
    const lista = (await storageService.carregar<any[]>(CHAVE_USUARIOS)) ?? [];
    return lista.map(Usuario.fromJSON);
  },
  async cadastrar(usuario: Usuario): Promise<void> {
    const usuarios = await this.listarUsuarios();
    if (usuarios.some((u) => u.email === usuario.email)) {
      throw new Error('Este e-mail já está cadastrado.');
    }
    usuarios.push(usuario);
    await storageService.salvar(
      CHAVE_USUARIOS,
      usuarios.map((u) => u.toJSON()),
    );
  },
  async login(email: string, senha: string): Promise<Usuario> {
    const usuarios = await this.listarUsuarios();
    const encontrado = usuarios.find((u) => u.email === email.trim());
    if (!encontrado || !encontrado.validarSenha(senha)) {
      throw new Error('Usuário ou senha inválidos.');
    }
    await storageService.salvar(CHAVE_SESSAO, encontrado.toJSON());
    return encontrado;
  },
  async sessaoAtual(): Promise<Usuario | null> {
    const obj = await storageService.carregar<any>(CHAVE_SESSAO);
    return obj ? Usuario.fromJSON(obj) : null;
  },
  async logout(): Promise<void> {
    await storageService.remover(CHAVE_SESSAO);
  },
  async atualizarPerfil(usuario: Usuario): Promise<void> {
    const usuarios = await this.listarUsuarios();
    const idx = usuarios.findIndex((u) => u.email === usuario.email);
    if (idx >= 0) usuarios[idx] = usuario;
    await storageService.salvar(
      CHAVE_USUARIOS,
      usuarios.map((u) => u.toJSON()),
    );
    await storageService.salvar(CHAVE_SESSAO, usuario.toJSON());
  },
};
