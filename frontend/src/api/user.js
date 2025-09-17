import api from "../services/api";

export async function createUser(data) {
  const res = await api.post("/users", data);
  return res.data;
}

export async function updateUser(id, data) {
  const res = await api.put(`/users/${id}`, data);
  return res.data;
}

export async function deleteUser(id) {
  const res = await api.delete(`/users/${id}`);
  return res.data;
}

export async function getUser(id) {
  const res = await api.get(`/users/${id}`);
  return res.data;
}

export async function listUsers() {
  const res = await api.get("/users");
  return res.data;
}
