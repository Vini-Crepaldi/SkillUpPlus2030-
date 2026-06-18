import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { useAuth } from '../hooks/useAuth';
import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';
import DrawerNavigator from './DrawerNavigator';
import CursoDetalheScreen from '../screens/CursoDetalheScreen';
import { cores } from '../styles/theme';
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function AppNavigator() {
  const { usuario, carregando } = useAuth();
  if (carregando) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={cores.primaria} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {usuario ? (
          <>
            <Stack.Screen
              name="App"
              component={DrawerNavigator}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CursoDetalhe"
              component={CursoDetalheScreen}
              options={{
                title: 'Detalhes do curso',
                headerStyle: {
                  backgroundColor: cores.primaria,
                },
                headerTintColor: cores.textoInverso,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Cadastro"
              component={CadastroScreen}
              options={{
                title: 'Cadastro',
                headerStyle: {
                  backgroundColor: cores.primaria,
                },
                headerTintColor: cores.textoInverso,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.fundo,
  },
});
