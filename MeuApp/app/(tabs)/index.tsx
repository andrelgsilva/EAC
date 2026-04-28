import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import {
  Appbar,
  Card,
  Button,
  TextInput,
  Avatar,
  FAB,
  Text,
  Snackbar
} from 'react-native-paper';
import { ThemeContext } from '../_layout';

export default function HomeScreen() {
  const [nome, setNome] = useState('');
  const [visibleSnack, setVisibleSnack] = useState(false);
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="React Native Paper" />
      </Appbar.Header>

      <View style={styles.content}>
        <Avatar.Icon
          size={80}
          icon="account"
          style={styles.avatar}
        />

        <TextInput
          label="Digite seu nome"
          value={nome}
          onChangeText={setNome}
          mode="outlined"
          style={styles.input}
        />

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">
              Bem-vindo!
            </Text>
            <Text variant="bodyMedium">
              Este app demonstra os principais
              componentes do React Native Paper.
            </Text>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={() => router.push('/profile')}
          style={styles.button}
        >
          Ir para Perfil
        </Button>

        <FAB
          icon="plus"
          style={[
            styles.fab,
            { backgroundColor: isDarkTheme ? '#D0BCFF' : '#6750A4' }
          ]}
          color={isDarkTheme ? '#381E72' : '#FFFFFF'}
          onPress={() => setVisibleSnack(true)}
        />
      </View>

      <Snackbar
        visible={visibleSnack}
        onDismiss={() => setVisibleSnack(false)}
        duration={3000}
        style={[
          styles.snackbar,
          { backgroundColor: isDarkTheme ? '#381E72' : '#6750A4' }
        ]}
      >
        <Text style={{ textAlign: 'center', color: isDarkTheme ? '#D0BCFF' : '#FFFFFF' }}>
          FAB pressionado!
        </Text>
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    padding: 20
  },
  avatar: {
    alignSelf: 'center',
    marginBottom: 20
  },
  input: {
    marginBottom: 20
  },
  card: {
    marginBottom: 20
  },
  button: {
    marginTop: 10
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20
  }, 
  snackbar: {
    alignSelf: 'center',
  }
});