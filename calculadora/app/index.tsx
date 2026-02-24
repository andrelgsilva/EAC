import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Keyboard,
} from "react-native";

export default function Index() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState<number | null>(null);

  const calculateAge = () => {
    Keyboard.dismiss();

    if (!day || !month || !year) {
      Alert.alert("Erro", "Preencha dia, mês e ano");
      return;
    }

    const birthDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );

    const today = new Date();

    if (birthDate > today) {
      Alert.alert("Erro", "Data inválida");
      return;
    }

    let calculatedAge =
      today.getFullYear() - birthDate.getFullYear();

    const hasHadBirthdayThisYear =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    if (!hasHadBirthdayThisYear) {
      calculatedAge--;
    }

    setAge(calculatedAge);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Idade</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Dia"
          keyboardType="numeric"
          value={day}
          onChangeText={setDay}
          maxLength={2}
          returnKeyType="next"
        />

        <TextInput
          style={styles.input}
          placeholder="Mês"
          keyboardType="numeric"
          value={month}
          onChangeText={setMonth}
          maxLength={2}
          returnKeyType="next"
        />

        <TextInput
          style={styles.input}
          placeholder="Ano"
          keyboardType="numeric"
          value={year}
          onChangeText={setYear}
          maxLength={4}
          returnKeyType="done"
          onSubmitEditing={calculateAge}
        />
      </View>

      <Button title="Calcular Idade" onPress={calculateAge} />

      {age !== null && (
        <Text style={styles.result}>
          Você tem {age} anos
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    width: 80,
    textAlign: "center",
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "600",
  },
});