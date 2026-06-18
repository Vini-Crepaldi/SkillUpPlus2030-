import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../hooks/useAuth';
import { useProgresso } from '../hooks/useProgresso';
import { AreaInteresse } from '../models/Usuario';
import { cores, espacos, raio, fontes, sombra } from '../styles/theme';
const AREAS: AreaInteresse[] = ['IA', 'Gestão', 'Sustentabilidade', 'Soft Skills'];
export default function PerfilScreen() {
  const { usuario, atualizarArea, logout } = useAuth();
  const { progressoGeral } = useProgresso();
  function confirmarSaida() {
    Alert.alert('Sair', 'Deseja encerrar a sessão?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => logout(),
      },
    ]);
  }
  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={{
        padding: espacos.lg,
      }}
    >
      <View style={styles.avatarWrap}>
        <View style={styles.avatar}>
          <Text style={styles.avatarTxt}>
            {usuario?.nome?.charAt(0).toUpperCase() ?? '?'}
          </Text>
        </View>
        <Text style={styles.nome}>{usuario?.nome}</Text>
        <Text style={styles.email}>{usuario?.email}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Progresso geral</Text>
        <Text style={styles.valor}>{progressoGeral}%</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Área de interesse</Text>
        <View style={styles.caixaPicker}>
          <Picker
            selectedValue={usuario?.area}
            onValueChange={(v) => atualizarArea(v as AreaInteresse)}
          >
            {AREAS.map((a) => (
              <Picker.Item key={a} label={a} value={a} />
            ))}
          </Picker>
        </View>
        <Text style={styles.dica}>A mudança é salva automaticamente.</Text>
      </View>

      <TouchableOpacity style={styles.sair} onPress={confirmarSaida} activeOpacity={0.85}>
        <Text style={styles.sairTxt}>Sair da conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  avatarWrap: {
    alignItems: 'center',
    marginBottom: espacos.lg,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: raio.full,
    backgroundColor: cores.primaria,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: espacos.sm,
  },
  avatarTxt: {
    color: cores.textoInverso,
    fontSize: 40,
    fontWeight: '900',
  },
  nome: {
    fontSize: fontes.titulo,
    fontWeight: '800',
    color: cores.texto,
  },
  email: {
    color: cores.textoSuave,
    fontSize: fontes.corpo,
  },
  card: {
    backgroundColor: cores.cartao,
    borderRadius: raio.lg,
    padding: espacos.lg,
    marginBottom: espacos.md,
    ...sombra,
  },
  label: {
    color: cores.textoSuave,
    fontSize: fontes.pequeno,
    fontWeight: '600',
    marginBottom: espacos.xs,
  },
  valor: {
    color: cores.texto,
    fontSize: fontes.subtitulo,
    fontWeight: '800',
  },
  caixaPicker: {
    backgroundColor: cores.fundo,
    borderRadius: raio.md,
    borderWidth: 1,
    borderColor: cores.borda,
    overflow: 'hidden',
  },
  dica: {
    color: cores.textoSuave,
    fontSize: fontes.pequeno,
    marginTop: espacos.xs,
  },
  sair: {
    borderWidth: 1.5,
    borderColor: cores.erro,
    borderRadius: raio.md,
    paddingVertical: espacos.md,
    alignItems: 'center',
    marginTop: espacos.sm,
  },
  sairTxt: {
    color: cores.erro,
    fontWeight: '800',
    fontSize: fontes.corpo,
  },
});
