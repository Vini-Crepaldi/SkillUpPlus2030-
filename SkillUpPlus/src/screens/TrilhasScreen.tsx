import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useProgresso } from '../hooks/useProgresso';
import ProgressBar from '../components/ProgressBar';
import { AreaInteresse } from '../models/Usuario';
import { cores, espacos, raio, fontes, sombra } from '../styles/theme';
const FILTROS: ('Todas' | AreaInteresse)[] = [
  'Todas',
  'IA',
  'Gestão',
  'Sustentabilidade',
  'Soft Skills',
];
export default function TrilhasScreen() {
  const { trilhas } = useProgresso();
  const [filtro, setFiltro] = useState<'Todas' | AreaInteresse>('Todas');
  const visiveis =
    filtro === 'Todas' ? trilhas : trilhas.filter((t) => t.area === filtro);
  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={{
        padding: espacos.lg,
      }}
    >
      <Text style={styles.titulo}>Trilhas de aprendizado</Text>

      <Text style={styles.rotulo}>Filtrar por área</Text>
      <View style={styles.caixaPicker}>
        <Picker selectedValue={filtro} onValueChange={(v) => setFiltro(v)}>
          {FILTROS.map((f) => (
            <Picker.Item key={f} label={f} value={f} />
          ))}
        </Picker>
      </View>

      {visiveis.map((trilha) => (
        <View key={trilha.id} style={styles.card}>
          <Text style={styles.tag}>{trilha.area}</Text>
          <Text style={styles.nome}>{trilha.nome}</Text>
          <Text style={styles.desc}>{trilha.descricao}</Text>
          <Text style={styles.meta}>
            {trilha.concluidos}/{trilha.total} cursos concluídos
          </Text>

          <ProgressBar percentual={trilha.progresso()} />
        </View>
      ))}

      {visiveis.length === 0 && (
        <Text style={styles.vazio}>Nenhuma trilha nesta área ainda.</Text>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  titulo: {
    fontSize: fontes.titulo,
    fontWeight: '800',
    color: cores.texto,
    marginBottom: espacos.md,
  },
  rotulo: {
    fontSize: fontes.pequeno,
    color: cores.textoSuave,
    marginBottom: espacos.xs,
    fontWeight: '600',
  },
  caixaPicker: {
    backgroundColor: cores.cartao,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raio.md,
    marginBottom: espacos.lg,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: cores.cartao,
    borderRadius: raio.lg,
    padding: espacos.lg,
    marginBottom: espacos.md,
    ...sombra,
  },
  tag: {
    alignSelf: 'flex-start',
    fontSize: fontes.pequeno,
    color: cores.primaria,
    backgroundColor: cores.primariaClara,
    paddingHorizontal: espacos.sm,
    paddingVertical: 2,
    borderRadius: raio.full,
    fontWeight: '700',
    overflow: 'hidden',
    marginBottom: espacos.sm,
  },
  nome: {
    fontSize: fontes.subtitulo,
    fontWeight: '800',
    color: cores.texto,
  },
  desc: {
    color: cores.textoSuave,
    marginVertical: espacos.xs,
    fontSize: fontes.corpo,
  },
  meta: {
    color: cores.texto,
    fontWeight: '600',
    marginBottom: espacos.sm,
    fontSize: fontes.pequeno,
  },
  vazio: {
    textAlign: 'center',
    color: cores.textoSuave,
    marginTop: espacos.lg,
  },
});
