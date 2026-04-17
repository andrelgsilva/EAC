import { View, Text, StyleSheet } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o app</Text>
      <Text style={styles.body}>
        Esta agenda foi criada para ajudar você a organizar suas tarefas do dia a dia de forma simples e eficiente.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    padding: 32,
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
    color: "#111",
  },
  body: {
    fontSize: 15,
    color: "#555",
    lineHeight: 24,
  },
});