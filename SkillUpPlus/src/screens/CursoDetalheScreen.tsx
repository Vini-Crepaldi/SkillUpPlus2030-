import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useProgresso } from '../hooks/useProgresso';
import { cores, espacos, raio, fontes, sombra } from '../styles/theme';
type Props = NativeStackScreenProps<RootStackParamList, 'CursoDetalhe'>;
export default function CursoDetalheScreen({ route }: Props) {
  const { curso } = route.params;
  const { estaConcluido, alternarConcluido } = useProgresso();
  const concluido = estaConcluido(curso.id);
  function alternar() {
    alternarConcluido(curso.id);
    Alert.alert(
      'Progresso atualizado',
      !concluido ? 'Curso marcado como concluído! ✓' : 'Curso reaberto.',
    );
  }
  return (
    <ScrollView style={styles.tela}>
      <Image
        source={{
          uri: curso.imagem,
        }}
        style={styles.capa}
      />
      <View style={styles.corpo}>
        <Text style={styles.tag}>
          {curso.area} • {curso.nivel}
        </Text>
        <Text style={styles.titulo}>{curso.titulo}</Text>
        <Text style={styles.carga}>Carga horária: {curso.cargaHoraria}h</Text>
        <Text style={styles.descricao}>{curso.descricao}</Text>

        <Text style={styles.subsecao}>O que você vai desenvolver</Text>
        <Text style={styles.item}>• Aplicação prática voltada ao mercado atual</Text>
        <Text style={styles.item}>• Atividades curtas e gamificadas</Text>
        <Text style={styles.item}>• Certificado de microcredencial ao final</Text>

        <TouchableOpacity
          style={[styles.botao, concluido && styles.botaoConcluido]}
          onPress={alternar}
          activeOpacity={0.85}
        >
          <Text style={styles.botaoTxt}>
            {concluido ? '✓ Concluído (toque para reabrir)' : 'Marcar como concluído'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  capa: {
    width: '100%',
    height: 200,
    backgroundColor: cores.borda,
  },
  corpo: {
    padding: espacos.lg,
  },
  tag: {
    color: cores.primaria,
    fontWeight: '700',
    fontSize: fontes.pequeno,
    marginBottom: espacos.xs,
  },
  titulo: {
    fontSize: fontes.titulo,
    fontWeight: '800',
    color: cores.texto,
  },
  carga: {
    color: cores.textoSuave,
    marginTop: espacos.xs,
    marginBottom: espacos.md,
    fontSize: fontes.corpo,
  },
  descricao: {
    color: cores.texto,
    fontSize: fontes.corpo,
    lineHeight: 22,
  },
  subsecao: {
    fontSize: fontes.subtitulo,
    fontWeight: '800',
    color: cores.texto,
    marginTop: espacos.lg,
    marginBottom: espacos.sm,
  },
  item: {
    color: cores.textoSuave,
    fontSize: fontes.corpo,
    marginBottom: espacos.xs,
  },
  botao: {
    backgroundColor: cores.primaria,
    borderRadius: raio.md,
    paddingVertical: espacos.md,
    alignItems: 'center',
    marginTop: espacos.xl,
    ...sombra,
  },
  botaoConcluido: {
    backgroundColor: cores.sucesso,
  },
  botaoTxt: {
    color: cores.textoInverso,
    fontWeight: '800',
    fontSize: fontes.corpo,
  },
});
