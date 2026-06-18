import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { cores, espacos, raio, fontes, sombra } from '../styles/theme';
export default function Banner({ nome }: { nome: string }) {
  return (
    <View style={styles.banner}>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text style={styles.ola}>Olá, {nome} 👋</Text>
        <Text style={styles.frase}>
          Continue se requalificando para o futuro do trabalho.
        </Text>
      </View>
      <Image
        source={{
          uri: 'https://picsum.photos/seed/skillup-logo/200',
        }}
        style={styles.figura}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.primaria,
    borderRadius: raio.lg,
    padding: espacos.lg,
    marginBottom: espacos.lg,
    ...sombra,
  },
  ola: {
    color: cores.textoInverso,
    fontSize: fontes.titulo,
    fontWeight: '800',
  },
  frase: {
    color: '#C7D2FE',
    fontSize: fontes.corpo,
    marginTop: espacos.xs,
  },
  figura: {
    width: 56,
    height: 56,
    borderRadius: raio.full,
    marginLeft: espacos.md,
    borderWidth: 2,
    borderColor: cores.textoInverso,
  },
});
