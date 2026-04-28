import { Tabs } from 'expo-router';
import React, { useContext } from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemeContext } from '../_layout';

export default function TabLayout() {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkTheme ? '#D0BCFF' : '#6750A4',
        tabBarInactiveTintColor: isDarkTheme ? '#888' : '#999',
        tabBarStyle: {
          backgroundColor: isDarkTheme ? '#1C1B1F' : '#ffffff',
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="house.fill"
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="person.fill"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}