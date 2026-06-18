import { Curso } from '../models/Curso';
export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  App: undefined;
  CursoDetalhe: {
    curso: Curso;
  };
};
export type TabParamList = {
  Início: undefined;
  Trilhas: undefined;
  Progresso: undefined;
  Perfil: undefined;
};
export type DrawerParamList = {
  Painel: undefined;
  Sobre: undefined;
};
