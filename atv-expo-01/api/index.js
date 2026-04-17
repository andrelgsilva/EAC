import axios from "axios";


const urlBase = "https://api-tarefas-five.vercel.app";

export async function getTarefas() {
  const response = await axios.get(urlBase);
  return response.data; 
}

export async function getTarefa(id) {
  const response = await axios.get(`${urlBase}/${id}`);
  return response.data;
}

export async function adicionarTarefa(novaTarefa) {
  const response = await axios.post(urlBase, novaTarefa, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

export async function atualizarTarefa(tarefaAtualizada) {
  const response = await axios.put(
    `${urlBase}/${tarefaAtualizada.id}`,
    tarefaAtualizada,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

export async function removerTarefa(id) {
  const response = await axios.delete(`${urlBase}/${id}`);
  return response.data;
}