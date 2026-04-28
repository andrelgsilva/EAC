import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  List,
  Switch,
  Button,
  Snackbar,
  Dialog,
  Portal,
  Text
} from 'react-native-paper';

import { ThemeContext } from '../_layout';

export default function ProfileScreen() {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  const [visibleSnack, setVisibleSnack] = useState(false);
  const [visibleDialog, setVisibleDialog] = useState(false);

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>Configurações</List.Subheader>

        <List.Item
          title="Modo escuro"
          left={() => <List.Icon icon="theme-light-dark" />}
          right={() => (
            <Switch
              value={isDarkTheme}
              onValueChange={toggleTheme}
            />
          )}
        />

        <List.Item
          title="Notificações"
          left={() => <List.Icon icon="bell" />}
        />
      </List.Section>

      <Button
        mode="contained"
        onPress={() => setVisibleSnack(true)}
        style={styles.button}
      >
        Mostrar Snackbar
      </Button>

      <Button
        mode="outlined"
        onPress={() => setVisibleDialog(true)}
        style={styles.button}
      >
        Abrir Dialog
      </Button>

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
          Snackbar exibido com sucesso!
        </Text>
      </Snackbar>

      <Portal>
        <Dialog
          visible={visibleDialog}
          onDismiss={() => setVisibleDialog(false)}
        >
          <Dialog.Title>Aviso</Dialog.Title>

          <Dialog.Content>
            <Text variant="bodyMedium">
              Este é um exemplo de Dialog usando
              React Native Paper.
            </Text>
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={() => setVisibleDialog(false)}>
              Fechar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  button: {
    marginTop: 15
  },
  snackbar: {
    alignSelf: 'center',
  }
});