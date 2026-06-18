import { useEffect, useState, useCallback } from 'react';
import { storageService } from '../services/storageService';
export function useStorage<T>(
  chave: string,
  valorInicial: T,
): [T, (novo: T) => Promise<void>, boolean] {
  const [valor, setValor] = useState<T>(valorInicial);
  const [carregando, setCarregando] = useState(true);
  useEffect(() => {
    (async () => {
      const salvo = await storageService.carregar<T>(chave);
      if (salvo !== null) setValor(salvo);
      setCarregando(false);
    })();
  }, [chave]);
  const atualizar = useCallback(
    async (novo: T) => {
      setValor(novo);
      await storageService.salvar(chave, novo);
    },
    [chave],
  );
  return [valor, atualizar, carregando];
}
