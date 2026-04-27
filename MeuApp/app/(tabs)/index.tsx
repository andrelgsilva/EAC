import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import {
  Appbar,
  Card,
  Title,
  Paragraph,
  Button,
  TextInput,
  Avatar,
  FAB,
  Text
} from 'react-native-paper';

export default function HomeScreen() {
  const [nome, setNome] = useState('');

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
            <Paragraph>
              Este app demonstra os principais
              componentes do React Native Paper.
            </Paragraph>
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
          style={styles.fab}
          onPress={() => console.log('FAB pressionado')}
        />
      </View>
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
  }
});