import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";

export default function TabTwoScreen() {
  const abrirGithub = () => {
    Linking.openURL("https://github.com/andrelgsilva");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meu GitHub</Text>
      <Text style={styles.descricao}>
        Confira meus projetos e repositórios no GitHub!
      </Text>
      <TouchableOpacity style={styles.botao} onPress={abrirGithub}>
        <Text style={styles.botaoTexto}>Abrir GitHub</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000000",
  },
  descricao: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#555555",
  },
  botao: {
    backgroundColor: "#24292e",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  botaoTexto: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});