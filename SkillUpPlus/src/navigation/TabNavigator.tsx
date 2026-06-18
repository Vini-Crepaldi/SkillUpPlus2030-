import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TabParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import TrilhasScreen from '../screens/TrilhasScreen';
import ProgressoScreen from '../screens/ProgressoScreen';
import PerfilScreen from '../screens/PerfilScreen';
import { cores } from '../styles/theme';
const Tab = createBottomTabNavigator<TabParamList>();
const ICONES: Record<keyof TabParamList, keyof typeof Ionicons.glyphMap> = {
  Início: 'home',
  Trilhas: 'git-network',
  Progresso: 'trending-up',
  Perfil: 'person',
};
export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: cores.primaria,
        tabBarInactiveTintColor: cores.textoSuave,
        tabBarStyle: {
          backgroundColor: cores.cartao,
          borderTopColor: cores.borda,
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={ICONES[route.name]} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Trilhas" component={TrilhasScreen} />
      <Tab.Screen name="Progresso" component={ProgressoScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}
