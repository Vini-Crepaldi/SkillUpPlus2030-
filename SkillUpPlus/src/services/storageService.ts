import AsyncStorage from '@react-native-async-storage/async-storage';
export const storageService = {
  async salvar<T>(chave: string, valor: T): Promise<void> {
    await AsyncStorage.setItem(chave, JSON.stringify(valor));
  },
  async carregar<T>(chave: string): Promise<T | null> {
    const bruto = await AsyncStorage.getItem(chave);
    return bruto ? (JSON.parse(bruto) as T) : null;
  },
  async remover(chave: string): Promise<void> {
    await AsyncStorage.removeItem(chave);
  },
};
