import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { cores, espacos, raio, fontes, sombra } from '../styles/theme';
const ODS = [
  {
    n: 4,
    titulo: 'Educação de Qualidade',
    desc: 'Acesso a aprendizado contínuo e relevante.',
  },
  {
    n: 8,
    titulo: 'Trabalho Decente',
    desc: 'Empregabilidade frente à automação.',
  },
  {
    n: 9,
    titulo: 'Inovação',
    desc: 'Capacitação em tecnologias emergentes.',
  },
  {
    n: 10,
    titulo: 'Redução das Desigualdades',
    desc: 'Oportunidade de requalificação para todos.',
  },
];
export default function SobreScreen() {
  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={{
        padding: espacos.lg,
      }}
    >
      <Text style={styles.titulo}>SkillUpPlus 2030+</Text>
      <Text style={styles.texto}>
        Plataforma de requalificação profissional (reskilling) que ajuda pessoas a se
        prepararem para o futuro do trabalho diante da IA, da automação e da economia
        sustentável.
      </Text>

      <Text style={styles.secao}>Alinhamento com os ODS da ONU</Text>
      {ODS.map((o) => (
        <View key={o.n} style={styles.card}>
          <Text style={styles.ods}>ODS {o.n}</Text>
          <Text style={styles.odsTitulo}>{o.titulo}</Text>
          <Text style={styles.texto}>{o.desc}</Text>
        </View>
      ))}
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
    color: cores.primaria,
    marginBottom: espacos.sm,
  },
  texto: {
    color: cores.textoSuave,
    fontSize: fontes.corpo,
    lineHeight: 22,
  },
  secao: {
    fontSize: fontes.subtitulo,
    fontWeight: '800',
    color: cores.texto,
    marginTop: espacos.lg,
    marginBottom: espacos.md,
  },
  card: {
    backgroundColor: cores.cartao,
    borderRadius: raio.lg,
    padding: espacos.lg,
    marginBottom: espacos.md,
    ...sombra,
  },
  ods: {
    color: cores.acento,
    fontWeight: '900',
    fontSize: fontes.pequeno,
  },
  odsTitulo: {
    color: cores.texto,
    fontWeight: '800',
    fontSize: fontes.subtitulo,
    marginVertical: 2,
  },
});
