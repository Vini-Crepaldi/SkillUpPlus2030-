import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { cores, raio, espacos, fontes } from '../styles/theme';
interface Props {
  percentual: number;
  mostrarRotulo?: boolean;
}
export default function ProgressBar({ percentual, mostrarRotulo = true }: Props) {
  const p = Math.max(0, Math.min(100, percentual));
  return (
    <View>
      <View style={styles.trilho}>
        <View
          style={[
            styles.preenchimento,
            {
              width: `${p}%`,
            },
          ]}
        />
      </View>
      {mostrarRotulo && <Text style={styles.rotulo}>{p}% concluído</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  trilho: {
    height: 10,
    backgroundColor: cores.borda,
    borderRadius: raio.full,
    overflow: 'hidden',
  },
  preenchimento: {
    height: '100%',
    backgroundColor: cores.sucesso,
    borderRadius: raio.full,
  },
  rotulo: {
    marginTop: espacos.xs,
    fontSize: fontes.pequeno,
    color: cores.textoSuave,
    fontWeight: '600',
  },
});
