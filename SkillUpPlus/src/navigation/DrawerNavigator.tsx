import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { DrawerParamList } from './types';
import TabNavigator from './TabNavigator';
import SobreScreen from '../screens/SobreScreen';
import { cores } from '../styles/theme';
const Drawer = createDrawerNavigator<DrawerParamList>();
export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: cores.primaria,
        },
        headerTintColor: cores.textoInverso,
        drawerActiveTintColor: cores.primaria,
        drawerActiveBackgroundColor: cores.primariaClara,
      }}
    >
      <Drawer.Screen
        name="Painel"
        component={TabNavigator}
        options={{
          title: 'SkillUpPlus 2030+',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="grid" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Sobre"
        component={SobreScreen}
        options={{
          title: 'Sobre o app',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="information-circle" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
