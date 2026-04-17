import Parse from "./back4app";

const Task = Parse.Object.extend("Task");

// CREATE
export async function adicionarTarefa(descricao) {
  const task = new Task();

  task.set("descricao", descricao);
  task.set("concluida", false);

  return await task.save();
}

// GET
export async function getTarefas() {
  const query = new Parse.Query(Task);

  //  ordenar (mais recentes primeiro)
  query.descending("createdAt");

  const results = await query.find();

  return results.map((t) => ({
    objectId: t.id,
    descricao: t.get("descricao"),
    concluida: t.get("concluida") ?? false, // evita undefined
  }));
}

// UPDATE DESCRIÇÃO
export async function atualizarDescricao({ objectId, descricao }) {
  const query = new Parse.Query(Task);
  const task = await query.get(objectId);

  task.set("descricao", descricao);
  return await task.save();
}

export async function atualizarTarefa({ objectId, descricao, concluida }) {
  const query = new Parse.Query(Task);
  const task = await query.get(objectId);

  // só atualiza o que vier
  if (descricao !== undefined) {
    task.set("descricao", descricao);
  }

  if (concluida !== undefined) {
    task.set("concluida", concluida);
  }

  return await task.save();
}

// DELETE
export async function deletarTarefa(objectId) {
  const query = new Parse.Query(Task);
  const task = await query.get(objectId);

  return await task.destroy();
}

// MARCAR COMO CONCLUÍDA
export async function toggleConcluida(objectId, status) {
  const query = new Parse.Query(Task);
  const task = await query.get(objectId);

  task.set("concluida", status);
  return await task.save();
}