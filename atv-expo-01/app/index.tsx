import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>📅</Text>
        </View>
        <Text style={styles.title}>Sua agenda</Text>
        <Text style={styles.subtitle}>Organize suas tarefas e compromissos</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/tarefas")}
        >
          <Text style={styles.primaryButtonText}>Ver tarefas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push("/about")}
        >
          <Text style={styles.secondaryButtonText}>Sobre o app</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    gap: 48,
  },
  hero: {
    alignItems: "center",
    gap: 10,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  iconText: {
    fontSize: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    color: "#111",
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  buttons: {
    width: "100%",
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#111",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "500",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#CCC",
  },
  secondaryButtonText: {
    color: "#111",
    fontSize: 15,
    fontWeight: "500",
  },
});