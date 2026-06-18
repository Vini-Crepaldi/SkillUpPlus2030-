import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import InputField from '../components/InputField';
import { useAuth } from '../hooks/useAuth';
import { Usuario } from '../models/Usuario';
import { cores, espacos, raio, fontes } from '../styles/theme';
type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;
export default function LoginScreen({ navigation }: Props) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erros, setErros] = useState<{
    email?: string;
    senha?: string;
  }>({});
  function validar(): boolean {
    const novos: typeof erros = {};
    if (!email.trim()) novos.email = 'Informe seu e-mail.';
    if (!senha) novos.senha = 'Informe sua senha.';
    else if (!Usuario.senhaForte(senha))
      novos.senha = 'A senha deve ter ao menos 6 caracteres.';
    setErros(novos);
    return Object.keys(novos).length === 0;
  }
  async function entrar() {
    if (!validar()) return;
    try {
      await login(email, senha);
    } catch (e: any) {
      Alert.alert('Não foi possível entrar', e.message ?? 'Tente novamente.');
    }
  }
  return (
    <KeyboardAvoidingView
      style={styles.tela}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.cabecalho}>
        <Text style={styles.logo}>
          SkillUp
          <Text
            style={{
              color: cores.acento,
            }}
          >
            Plus
          </Text>
        </Text>
        <Text style={styles.tagline}>Requalificação digital • 2030+</Text>
      </View>

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

      <TouchableOpacity style={styles.botao} onPress={entrar} activeOpacity={0.85}>
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.link}>
          Ainda não tem conta? <Text style={styles.linkForte}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
    padding: espacos.lg,
    justifyContent: 'center',
  },
  cabecalho: {
    alignItems: 'center',
    marginBottom: espacos.xl,
  },
  logo: {
    fontSize: 40,
    fontWeight: '900',
    color: cores.primaria,
  },
  tagline: {
    color: cores.textoSuave,
    marginTop: espacos.xs,
    fontSize: fontes.corpo,
  },
  botao: {
    backgroundColor: cores.primaria,
    paddingVertical: espacos.md,
    borderRadius: raio.md,
    alignItems: 'center',
    marginTop: espacos.sm,
  },
  botaoTexto: {
    color: cores.textoInverso,
    fontWeight: '800',
    fontSize: fontes.subtitulo,
  },
  link: {
    textAlign: 'center',
    marginTop: espacos.lg,
    color: cores.textoSuave,
  },
  linkForte: {
    color: cores.primaria,
    fontWeight: '700',
  },
});
