import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const setAuthToken = (token) => {
  if (token) instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete instance.defaults.headers.common["Authorization"];
};

export default {
  instance,
  setAuthToken,
  // auth
  register: (data) => instance.post("/auth/register", data),
  login: (data) => instance.post("/auth/login", data),
  getProfile: () => instance.get("/auth/me"),
  updateProfile: (data) => instance.put("/auth/me", data),
  changePassword: (data) => instance.put("/auth/me/password", data),
  // notes
  getNotes: () => instance.get("/notes"),
  createNote: (data) => instance.post("/notes", data),
  updateNote: (id, data) => instance.put(`/notes/${id}`, data),
  deleteNote: (id) => instance.delete(`/notes/${id}`),
};
