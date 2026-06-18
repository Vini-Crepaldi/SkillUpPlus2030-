import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { cores, espacos, raio, fontes } from '../styles/theme';
export interface EtapaTimeline {
  titulo: string;
  descricao?: string;
  concluida: boolean;
}
export default function Timeline({ etapas }: { etapas: EtapaTimeline[] }) {
  const indiceAtual = etapas.findIndex((e) => !e.concluida);
  return (
    <View>
      {etapas.map((etapa, i) => {
        const ehAtual = i === indiceAtual;
        const ultima = i === etapas.length - 1;
        return (
          <View key={i} style={styles.linha}>
            <View style={styles.colunaMarcador}>
              <View
                style={[
                  styles.no,
                  etapa.concluida && styles.noConcluido,
                  ehAtual && styles.noAtual,
                ]}
              >
                {etapa.concluida && <Text style={styles.check}>✓</Text>}
              </View>
              {!ultima && (
                <View
                  style={[styles.conector, etapa.concluida && styles.conectorAtivo]}
                />
              )}
            </View>

            <View style={styles.conteudo}>
              <Text
                style={[styles.tituloEtapa, etapa.concluida && styles.tituloConcluido]}
              >
                {etapa.titulo}
              </Text>
              {!!etapa.descricao && (
                <Text style={styles.descricao}>{etapa.descricao}</Text>
              )}
              <Text style={styles.status}>
                {etapa.concluida ? 'Concluído' : ehAtual ? 'Em andamento' : 'A fazer'}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
const TAM_NO = 26;
const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
  },
  colunaMarcador: {
    alignItems: 'center',
    width: 40,
  },
  no: {
    width: TAM_NO,
    height: TAM_NO,
    borderRadius: raio.full,
    borderWidth: 2,
    borderColor: cores.borda,
    backgroundColor: cores.cartao,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noConcluido: {
    backgroundColor: cores.sucesso,
    borderColor: cores.sucesso,
  },
  noAtual: {
    borderColor: cores.primaria,
    borderWidth: 3,
  },
  check: {
    color: cores.textoInverso,
    fontWeight: '900',
    fontSize: 14,
  },
  conector: {
    width: 3,
    flex: 1,
    minHeight: 28,
    backgroundColor: cores.borda,
  },
  conectorAtivo: {
    backgroundColor: cores.sucesso,
  },
  conteudo: {
    flex: 1,
    paddingBottom: espacos.lg,
    paddingLeft: espacos.sm,
  },
  tituloEtapa: {
    fontSize: fontes.corpo,
    fontWeight: '700',
    color: cores.texto,
  },
  tituloConcluido: {
    color: cores.textoSuave,
  },
  descricao: {
    color: cores.textoSuave,
    fontSize: fontes.pequeno,
    marginTop: 2,
  },
  status: {
    marginTop: espacos.xs,
    fontSize: fontes.pequeno,
    fontWeight: '700',
    color: cores.primaria,
  },
});
