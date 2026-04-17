import "react-native-get-random-values";
import { View, Button } from "react-native";
import {
  adicionarTarefa,
  atualizarTarefa,
  getTarefas,
} from "../services/taskService";


export default function Home() {

  async function handleCriar() {
    await adicionarTarefa("Minha primeira tarefa");
    console.log("Criou!");
  }

  async function handleListar() {
    const tarefas = await getTarefas();

    tarefas.forEach(t => {
      console.log(t.descricao);
    });
  }

  return (
    <View>
      <Button title="Criar tarefa" onPress={handleCriar} />
      <Button
            title="Atualizar tarefa teste"
            onPress={() =>
                atualizarTarefa({
                objectId: "COLOCA_ID_AQUI",
                descricao: "Nova descrição",
                })
            }
            />
      <Button title="Listar tarefas" onPress={handleListar} />
    </View>
  );
}