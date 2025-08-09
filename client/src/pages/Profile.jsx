import React, { useState, useEffect } from "react";
import api from "../api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    api.getProfile().then(res => {
      setUser(res.data);
      setName(res.data.name);
      setEmail(res.data.email);
    });
  }, []);

  const saveProfile = async () => {
    setErr(""); setMsg("");
    try {
      const res = await api.updateProfile({ name, email });
      setUser(res.data);
      setMsg("Profile updated successfully");
    } catch (e) {
      setErr(e.response?.data?.message || "Failed to update profile");
    }
  };

  const changePass = async () => {
    setErr(""); setMsg("");
    try {
      await api.changePassword({ oldPassword, newPassword });
      setMsg("Password changed successfully");
      setOldPassword(""); setNewPassword("");
    } catch (e) {
      setErr(e.response?.data?.message || "Failed to change password");
    }
  };

  if (!user) return <div className="card">Loading...</div>;

  return (
    <div className="card">
      <h2>Profile</h2>
      {msg && <div className="success">{msg}</div>}
      {err && <div className="error">{err}</div>}

      <h3>Edit Info</h3>
      <label>Name</label>
      <input value={name} onChange={e => setName(e.target.value)} />
      <label>Email</label>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <button className="btn" onClick={saveProfile}>Save</button>

      <h3 style={{ marginTop: "20px" }}>Change Password</h3>
      <label>Old Password</label>
      <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
      <label>New Password</label>
      <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
      <button className="btn" onClick={changePass}>Update Password</button>
    </div>
  );
}
