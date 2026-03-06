import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function Index() {
  const [age, setAge] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [birthYear, setBirthYear] = useState<number | null>(null);

  useEffect(() => {
    calculateBirthYear();
  }, [age, day, month]);

  const calculateBirthYear = () => {
    if (!age || !day || !month) {
      setBirthYear(null);
      return;
    }

    const today = new Date();

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    let calculatedYear = currentYear - Number(age);

    const hasHadBirthday =
      currentMonth > Number(month) ||
      (currentMonth === Number(month) && currentDay >= Number(day));

    if (!hasHadBirthday) {
      calculatedYear -= 1;
    }

    setBirthYear(calculatedYear);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Calculadora de Ano de Nascimento</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Idade"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
          maxLength={3}
        />

        <TextInput
          style={styles.input}
          placeholder="Dia"
          keyboardType="numeric"
          value={day}
          onChangeText={setDay}
          maxLength={2}
        />

        <TextInput
          style={styles.input}
          placeholder="Mês"
          keyboardType="numeric"
          value={month}
          onChangeText={setMonth}
          maxLength={2}
        />
      </View>

      {birthYear !== null && (
        <Text style={styles.result}>
          Ano de nascimento: {birthYear}
        </Text>
      )}
    </KeyboardAvoidingView>
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
    fontWeight: "bold",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: 90,
    padding: 10,
    textAlign: "center",
  },
  result: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
  },
});