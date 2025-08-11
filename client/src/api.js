import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "https://notes-keeper-7a8e.onrender.com",
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
  register: (data) => instance.post("api/auth/register", data),
  login: (data) => instance.post("api/auth/login", data),
  getProfile: () => instance.get("api/auth/me"),
  updateProfile: (data) => instance.put("api/auth/me", data),
  changePassword: (data) => instance.put("api/auth/me/password", data),
  // notes
  getNotes: () => instance.get("api/notes"),
  createNote: (data) => instance.post("api/notes", data),
  updateNote: (id, data) => instance.put(`api/notes/${id}`, data),
  deleteNote: (id) => instance.delete(`api/notes/${id}`),
};
