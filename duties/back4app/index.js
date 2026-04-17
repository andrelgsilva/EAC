import axios from "axios";

const urlBase = "https://parseapi.back4app.com/classes/Tarefa";
const headers = {
  "X-Parse-Application-Id": "Cd3Ve07j9y29MtpjdVgKjs0MUjHD2kNVDXd5SV6X",
  "X-Parse-JavaScript-Key": "jJvxB60ET9twutc3xRsboW7Vp6OhRFvWRdFWAsdQ",
};
const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

export async function getTarefas() {
  const response = await axios.get(urlBase, { headers });
  return response.data.results;
}

export async function adicionarTarefa(novaTarefa) {
  const response = await axios.post(urlBase, novaTarefa, { headers: headersJson });
  return response.data;
}

export async function atualizarTarefa(objectId, campos) {
  const response = await axios.put(`${urlBase}/${objectId}`, campos, { headers: headersJson });
  return response.data;
}

export async function deletarTarefa(objectId) {
  const response = await axios.delete(`${urlBase}/${objectId}`, { headers });
  return response.data;
}