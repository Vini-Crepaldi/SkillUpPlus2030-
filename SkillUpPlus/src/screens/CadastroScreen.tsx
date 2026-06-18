import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import InputField from '../components/InputField';
import { useAuth } from '../hooks/useAuth';
import { Usuario, AreaInteresse } from '../models/Usuario';
import { cores, espacos, raio, fontes } from '../styles/theme';
type Props = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;
const AREAS: AreaInteresse[] = ['IA', 'Gestão', 'Sustentabilidade', 'Soft Skills'];
export default function CadastroScreen({ navigation }: Props) {
  const { cadastrar } = useAuth();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [area, setArea] = useState<AreaInteresse>('IA');
  const [erros, setErros] = useState<Record<string, string>>({});
  function validar(): boolean {
    const novos: Record<string, string> = {};
    if (!nome.trim()) novos.nome = 'Informe seu nome.';
    if (!email.includes('@')) novos.email = 'E-mail inválido.';
    if (!Usuario.senhaForte(senha)) novos.senha = 'Mínimo de 6 caracteres.';
    setErros(novos);
    return Object.keys(novos).length === 0;
  }
  async function enviar() {
    if (!validar()) return;
    try {
      await cadastrar(nome, email, senha, area);
      Alert.alert('Bem-vindo(a)!', 'Conta criada com sucesso.');
    } catch (e: any) {
      Alert.alert('Erro no cadastro', e.message ?? 'Tente novamente.');
    }
  }
  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={{
        padding: espacos.lg,
      }}
    >
      <Text style={styles.titulo}>Criar conta</Text>

      <InputField
        rotulo="Nome"
        placeholder="Seu nome"
        value={nome}
        onChangeText={setNome}
        erro={erros.nome}
      />
      <InputField
        rotulo="E-mail"
        placeholder="voce@email.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        erro={erros.email}
      />
      <InputField
        rotulo="Senha"
        placeholder="••••••"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        erro={erros.senha}
      />

      <Text style={styles.rotulo}>Área de interesse</Text>
      <View style={styles.caixaPicker}>
        <Picker selectedValue={area} onValueChange={(v) => setArea(v as AreaInteresse)}>
          {AREAS.map((a) => (
            <Picker.Item key={a} label={a} value={a} />
          ))}
        </Picker>
      </View>

      <View style={styles.botao}>
        <Button title="Cadastrar" color={cores.primaria} onPress={enviar} />
      </View>

      <View
        style={{
          marginTop: espacos.sm,
        }}
      >
        <Button
          title="Voltar ao login"
          color={cores.textoSuave}
          onPress={() => navigation.goBack()}
        />
      </View>
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
    marginBottom: espacos.lg,
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
  botao: {
    borderRadius: raio.md,
    overflow: 'hidden',
  },
});
