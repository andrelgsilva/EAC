import { adicionarTarefa, getTarefas } from "@/back4app";
import { useTaskFilter } from "@/zustand";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function TarefasPage() {
  const isEnabled = useTaskFilter((state) => state.isEnabled);
  const toggleSwitch = useTaskFilter((state) => state.toggleSwitch);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery({
    queryKey: ["tarefas"],
    queryFn: getTarefas,
  });
  const mutation = useMutation({
    mutationFn: adicionarTarefa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
    },
  });
  const [descricao, setDescricao] = useState("");
  const tasks = isEnabled ? data?.filter((t) => !t.concluida) : data;

  async function handleAdicionarTarefaPress() {
    if (descricao.trim() === "") {
      Alert.alert("Descrição inválida", "Preencha a descrição da tarefa", [
        { text: "OK" },
      ]);
      return;
    }
    mutation.mutate({ descricao });
    setDescricao("");
  }

  return (
    <View style={styles.container}>
      {(isFetching || mutation.isPending) && (
        <View style={styles.loadingBar}>
          <ActivityIndicator size="small" color="#111" />
        </View>
      )}

      {/* Input para nova tarefa */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Nova tarefa..."
          placeholderTextColor="#AAA"
          value={descricao}
          onChangeText={setDescricao}
        />
        <TouchableOpacity
          style={[styles.addButton, mutation.isPending && styles.addButtonDisabled]}
          onPress={handleAdicionarTarefaPress}
          disabled={mutation.isPending}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Filtro */}
      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>Ocultar concluídas</Text>
        <Switch
          trackColor={{ false: "#E0E0E0", true: "#111" }}
          thumbColor="#FFF"
          ios_backgroundColor="#E0E0E0"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      {/* Lista */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {tasks?.map((t) => (
          <Pressable
            key={t.objectId}
            style={({ pressed }) => [
              styles.taskItem,
              pressed && styles.taskItemPressed,
            ]}
            onPress={() => router.push(`/tarefas/${t.objectId}`)}
          >
            <View style={[styles.taskCircle, t.concluida && styles.taskCircleDone]}>
              {t.concluida && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={[styles.taskText, t.concluida && styles.taskTextDone]}>
              {t.descricao}
            </Text>
          </Pressable>
        ))}

        {tasks?.length === 0 && (
          <Text style={styles.emptyText}>Nenhuma tarefa encontrada</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    padding: 20,
  },
  loadingBar: {
    alignItems: "center",
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  input: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#CCC",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#111",
    backgroundColor: "#FFF",
  },
  addButton: {
    backgroundColor: "#111",
    borderRadius: 12,
    width: 46,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonDisabled: {
    backgroundColor: "#888",
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "300",
    lineHeight: 26,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 14,
    color: "#555",
  },
  list: {
    flex: 1,
  },
  listContent: {
    gap: 4,
    paddingBottom: 20,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: "#FFF",
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    marginBottom: 4,
  },
  taskItemPressed: {
    backgroundColor: "#F5F5F5",
  },
  taskCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#CCC",
    justifyContent: "center",
    alignItems: "center",
  },
  taskCircleDone: {
    backgroundColor: "#111",
    borderColor: "#111",
  },
  checkmark: {
    color: "#FFF",
    fontSize: 11,
    fontWeight: "600",
  },
  taskText: {
    fontSize: 15,
    color: "#111",
    flex: 1,
  },
  taskTextDone: {
    color: "#AAA",
    textDecorationLine: "line-through",
  },
  emptyText: {
    textAlign: "center",
    color: "#BBB",
    fontSize: 14,
    marginTop: 40,
  },
});