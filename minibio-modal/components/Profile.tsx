import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Pressable } from "react-native";
import { useState } from "react";

export default function Profile() {
  const [modalVisivel, setModalVisivel] = useState(false);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/foto.jpg")} style={styles.image} />

      <Text style={styles.name}>André Gomes</Text>

      <Text style={styles.bio}>
        {`Estudante de desenvolvimento de software fascinado por tecnologia.
        \nTenho interesse em criar soluções práticas.
        \nEstou sempre aprendendo novas ferramentas.`}
      </Text>

      {/* Botão novo */}
      <TouchableOpacity
        style={styles.botao}
        onPress={() => setModalVisivel(true)}
      >
        <Text style={styles.botaoTexto}>Ver mais sobre mim</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={modalVisivel}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisivel(false)}
      >
        <Pressable 
          style={styles.overlay} 
          onPress={() => setModalVisivel(false)}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalBox}>

              <Text style={styles.modalTitulo}>Mais sobre mim</Text>

              <Text style={styles.modalTexto}>
                {`Localização: Recife, PE\n
                \n Stack: React Native, Expo, TypeScript\n
                \n Objetivo: Criar apps que resolvam problemas reais\n
                \n Atualmente estudando: Arquitetura mobile e boas práticas`}
              </Text>

              <TouchableOpacity
                style={styles.botaoFechar}
                onPress={() => setModalVisivel(false)}
              >
                <Text style={styles.botaoTexto}>Fechar</Text>
              </TouchableOpacity>

            </View>
          </Pressable>
        </Pressable>
      </Modal>

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
    color: "#000000",
  },
  bio: {
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 20,
    color: "#333333",
  },

  // Botão
  botao: {
    marginTop: 20,
    backgroundColor: "#24292e",
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 8,
  },
  botaoTexto: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
  },

  // Modal
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalBox: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    width: "100%",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 14,
    color: "#000000",
  },
  modalTexto: {
    fontSize: 15,
    textAlign: "center",
    color: "#444444",
    lineHeight: 24,
    marginBottom: 24,
  },
  botaoFechar: {
    backgroundColor: "#24292e",
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 8,
  },
});