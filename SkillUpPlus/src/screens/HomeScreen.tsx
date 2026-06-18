import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import Banner from '../components/Banner';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import { useAuth } from '../hooks/useAuth';
import { useProgresso } from '../hooks/useProgresso';
import { RECOMENDADOS } from '../data/mockData';
import { cores, espacos, fontes } from '../styles/theme';
export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { usuario } = useAuth();
  const { estaConcluido, progressoGeral } = useProgresso();
  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={{
        padding: espacos.lg,
      }}
    >
      <Banner nome={usuario?.nome ?? 'estudante'} />

      <View style={styles.resumoProgresso}>
        <Text style={styles.resumoTitulo}>Seu progresso geral</Text>
        <ProgressBar percentual={progressoGeral} />
      </View>

      <Text style={styles.secao}>Recomendados para você</Text>
      {RECOMENDADOS.map((curso) => (
        <Card
          key={curso.id}
          curso={curso}
          concluido={estaConcluido(curso.id)}
          onPress={() =>
            navigation.navigate('CursoDetalhe', {
              curso,
            })
          }
        />
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  resumoProgresso: {
    marginBottom: espacos.lg,
  },
  resumoTitulo: {
    fontWeight: '700',
    color: cores.texto,
    marginBottom: espacos.sm,
    fontSize: fontes.corpo,
  },
  secao: {
    fontSize: fontes.subtitulo,
    fontWeight: '800',
    color: cores.texto,
    marginBottom: espacos.md,
  },
});
