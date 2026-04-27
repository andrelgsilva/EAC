import React, { useState, createContext } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';

interface ThemeContextType {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkTheme: false,
  toggleTheme: () => {},
});


export default function RootLayout() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeContext.Provider
      value={{ isDarkTheme, toggleTheme }}
    >
      <PaperProvider theme={isDarkTheme ? MD3DarkTheme : MD3LightTheme}>
        <ThemeProvider
          value={isDarkTheme ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false }}
            />
          </Stack>

          <StatusBar style="auto" />
        </ThemeProvider>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}