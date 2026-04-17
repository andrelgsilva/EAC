import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { atualizarTarefa, getTarefa, removerTarefa } from "@/back4app";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TarefaDetalhesPage() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: tarefa, isLoading } = useQuery({
    queryKey: ["tarefa", id],
    queryFn: () => getTarefa(id),
  });

  const updateMutation = useMutation({
    mutationFn: atualizarTarefa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
      queryClient.invalidateQueries({ queryKey: ["tarefa", id] });
      Alert.alert("Sucesso", "Tarefa atualizada com sucesso!");
      router.back();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: removerTarefa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
      Alert.alert("Sucesso", "Tarefa removida com sucesso!");
      router.back();
    },
  });

  const [descricao, setDescricao] = useState("");
  const [concluida, setConcluida] = useState(false);

  useEffect(() => {
    if (tarefa) {
      setDescricao(tarefa.descricao);
      setConcluida(tarefa.concluida || false);
    }
  }, [tarefa]);

  function handleUpdate() {
    if (descricao.trim() === "") {
      Alert.alert("Erro", "A descrição não pode estar vazia.");
      return;
    }
    updateMutation.mutate({ id, descricao, concluida });
  }

  function handleDelete() {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir esta tarefa?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => deleteMutation.mutate(id),
        },
      ]
    );
  }

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#111" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: `Tarefa #${id}` }} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.container,
          { paddingBottom: insets.bottom + 32 },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Descrição */}
        <View style={styles.field}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.input}
            value={descricao}
            onChangeText={setDescricao}
            multiline
            placeholderTextColor="#AAA"
          />
        </View>

        {/* Concluída */}
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Concluída</Text>
          <Switch
            value={concluida}
            onValueChange={setConcluida}
            trackColor={{ false: "#E0E0E0", true: "#111" }}
            thumbColor="#FFF"
            ios_backgroundColor="#E0E0E0"
          />
        </View>

        {/* Botões */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.saveButton, updateMutation.isPending && styles.buttonDisabled]}
            onPress={handleUpdate}
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.saveButtonText}>Salvar alterações</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.deleteButton, deleteMutation.isPending && styles.buttonDisabled]}
            onPress={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? (
              <ActivityIndicator size="small" color="#C0392B" />
            ) : (
              <Text style={styles.deleteButtonText}>Excluir tarefa</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  container: {
    padding: 20,
    gap: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    color: "#888",
    fontWeight: "500",
  },
  input: {
    borderWidth: 0.5,
    borderColor: "#CCC",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: "#111",
    backgroundColor: "#FFF",
    minHeight: 52,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  switchLabel: {
    fontSize: 15,
    color: "#111",
  },
  actions: {
    gap: 10,
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: "#111",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "500",
  },
  deleteButton: {
    borderWidth: 0.5,
    borderColor: "#FFCCCC",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#C0392B",
    fontSize: 15,
    fontWeight: "500",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});