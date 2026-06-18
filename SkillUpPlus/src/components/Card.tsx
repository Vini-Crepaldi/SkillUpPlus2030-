import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Curso } from '../models/Curso';
import { cores, espacos, raio, fontes, sombra } from '../styles/theme';
interface Props {
  curso: Curso;
  onPress: () => void;
  concluido?: boolean;
}
export default function Card({ curso, onPress, concluido }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image
        source={{
          uri: curso.imagem,
        }}
        style={styles.imagem}
      />
      <View style={styles.corpo}>
        <View style={styles.linhaTopo}>
          <Text style={styles.tag}>{curso.area}</Text>
          {concluido && <Text style={styles.selo}>✓ Concluído</Text>}
        </View>
        <Text style={styles.titulo} numberOfLines={2}>
          {curso.titulo}
        </Text>

        <Text style={styles.resumo}>{curso.resumo()}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: cores.cartao,
    borderRadius: raio.lg,
    overflow: 'hidden',
    marginBottom: espacos.md,
    ...sombra,
  },
  imagem: {
    width: '100%',
    height: 130,
    backgroundColor: cores.borda,
  },
  corpo: {
    padding: espacos.md,
  },
  linhaTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: espacos.xs,
  },
  tag: {
    fontSize: fontes.pequeno,
    color: cores.primaria,
    backgroundColor: cores.primariaClara,
    paddingHorizontal: espacos.sm,
    paddingVertical: 2,
    borderRadius: raio.full,
    fontWeight: '700',
    overflow: 'hidden',
  },
  selo: {
    fontSize: fontes.pequeno,
    color: cores.sucesso,
    fontWeight: '700',
  },
  titulo: {
    fontSize: fontes.subtitulo,
    fontWeight: '700',
    color: cores.texto,
  },
  resumo: {
    marginTop: espacos.xs,
    color: cores.textoSuave,
    fontSize: fontes.corpo,
  },
});
