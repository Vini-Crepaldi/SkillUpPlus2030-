import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useProgresso } from '../hooks/useProgresso';
import Timeline, { EtapaTimeline } from '../components/Timeline';
import ProgressBar from '../components/ProgressBar';
import { cores, espacos, raio, fontes, sombra } from '../styles/theme';
export default function ProgressoScreen() {
  const { trilhas, progressoGeral } = useProgresso();
  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={{
        padding: espacos.lg,
      }}
    >
      <Text style={styles.titulo}>Sua jornada</Text>

      <View style={styles.resumo}>
        <Text style={styles.resumoNumero}>{progressoGeral}%</Text>
        <Text style={styles.resumoTexto}>do seu plano de requalificação concluído</Text>
        <View
          style={{
            marginTop: espacos.sm,
          }}
        >
          <ProgressBar percentual={progressoGeral} mostrarRotulo={false} />
        </View>
      </View>

      {trilhas.map((trilha) => {
        const etapas: EtapaTimeline[] = trilha.cursos.map((c) => ({
          titulo: c.titulo,
          descricao: c.resumo(),
          concluida: c.concluido,
        }));
        return (
          <View key={trilha.id} style={styles.bloco}>
            <Text style={styles.nomeTrilha}>{trilha.nome}</Text>
            <Timeline etapas={etapas} />
          </View>
        );
      })}
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
  resumo: {
    backgroundColor: cores.primaria,
    borderRadius: raio.lg,
    padding: espacos.lg,
    marginBottom: espacos.lg,
    ...sombra,
  },
  resumoNumero: {
    color: cores.textoInverso,
    fontSize: 44,
    fontWeight: '900',
  },
  resumoTexto: {
    color: '#C7D2FE',
    fontSize: fontes.corpo,
  },
  bloco: {
    backgroundColor: cores.cartao,
    borderRadius: raio.lg,
    padding: espacos.lg,
    marginBottom: espacos.md,
    ...sombra,
  },
  nomeTrilha: {
    fontSize: fontes.subtitulo,
    fontWeight: '800',
    color: cores.texto,
    marginBottom: espacos.md,
  },
});
