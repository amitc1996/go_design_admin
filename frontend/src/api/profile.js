import api from "../services/api";

export async function updatePassword(data) {
  const res = await api.post("/users/update_password", data);
  return res.data;
}

export async function updateAccount(id, data) {
  const res = await api.put(`/users/${id}/account`, data);
  return res.data;
}

export async function getAccount(id) {
  const res = await api.get(`/users/${id}/account`);
  return res.data;
}

export async function listUsers() {
  const res = await api.get("/users");
  return res.data;
}
