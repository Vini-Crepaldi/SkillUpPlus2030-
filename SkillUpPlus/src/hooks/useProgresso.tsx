import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { TRILHAS } from '../data/mockData';
import { Trilha } from '../models/Trilha';
import { storageService } from '../services/storageService';
const CHAVE_PROGRESSO = '@skillup:concluidos';
interface ProgressoContextData {
  concluidos: string[];
  alternarConcluido: (idCurso: string) => void;
  estaConcluido: (idCurso: string) => boolean;
  trilhas: Trilha[];
  progressoGeral: number;
}
const ProgressoContext = createContext<ProgressoContextData>({} as ProgressoContextData);
export function ProgressoProvider({ children }: { children: ReactNode }) {
  const [concluidos, setConcluidos] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      const salvo = await storageService.carregar<string[]>(CHAVE_PROGRESSO);
      if (salvo) setConcluidos(salvo);
    })();
  }, []);
  function persistir(novo: string[]) {
    setConcluidos(novo);
    storageService.salvar(CHAVE_PROGRESSO, novo);
  }
  function alternarConcluido(idCurso: string) {
    const novo = concluidos.includes(idCurso)
      ? concluidos.filter((id) => id !== idCurso)
      : [...concluidos, idCurso];
    persistir(novo);
  }
  const estaConcluido = (idCurso: string) => concluidos.includes(idCurso);
  const trilhas = useMemo(() => {
    TRILHAS.forEach((t) =>
      t.cursos.forEach((c) => {
        c.concluido = concluidos.includes(c.id);
      }),
    );
    return [...TRILHAS];
  }, [concluidos]);
  const progressoGeral = useMemo(() => {
    const todos = TRILHAS.flatMap((t) => t.cursos);
    if (todos.length === 0) return 0;
    return Math.round((concluidos.length / todos.length) * 100);
  }, [concluidos]);
  return (
    <ProgressoContext.Provider
      value={{
        concluidos,
        alternarConcluido,
        estaConcluido,
        trilhas,
        progressoGeral,
      }}
    >
      {children}
    </ProgressoContext.Provider>
  );
}
export function useProgresso(): ProgressoContextData {
  return useContext(ProgressoContext);
}
