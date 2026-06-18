import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { cores, espacos, raio, fontes } from '../styles/theme';
interface Props extends TextInputProps {
  rotulo: string;
  erro?: string;
}
export default function InputField({ rotulo, erro, style, ...resto }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <TextInput
        placeholderTextColor={cores.textoSuave}
        style={[styles.input, !!erro && styles.inputErro, style]}
        {...resto}
      />
      {!!erro && <Text style={styles.erro}>{erro}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: espacos.md,
  },
  rotulo: {
    fontSize: fontes.pequeno,
    color: cores.textoSuave,
    marginBottom: espacos.xs,
    fontWeight: '600',
  },
  input: {
    backgroundColor: cores.cartao,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raio.md,
    paddingHorizontal: espacos.md,
    paddingVertical: espacos.sm + 4,
    fontSize: fontes.corpo,
    color: cores.texto,
  },
  inputErro: {
    borderColor: cores.erro,
  },
  erro: {
    color: cores.erro,
    fontSize: fontes.pequeno,
    marginTop: espacos.xs,
  },
});
