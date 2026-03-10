import { View, Text, Image, StyleSheet } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/foto.jpg")} style={styles.image} />

      <Text style={styles.name}>André Gomes</Text>

      <Text style={styles.bio}>
            {`Estudante de desenvolvimento de software fascinado por tecnologia.
            \nTenho interesse em criar soluções práticas.
            \nEstou sempre aprendendo novas ferramentas.`}
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    color: "#000000",  // 👈
  },
  bio: {
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 20,
    color: "#333333",  // 👈
  },
});