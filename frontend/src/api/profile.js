import api from "../services/api";

export async function updatePassword(data) {
  const res = await api.post("/user/update_password", data);
  return res.data;
}

export async function updateAccount(id, data) {
  const res = await api.put(`/profile/${id}/account`, data);
  return res.data;
}

export async function getAccount(id) {
  const res = await api.get(`/profile/${id}`);
  return res.data;
}

export async function listUsers() {
  const res = await api.get("/users");
  return res.data;
}
