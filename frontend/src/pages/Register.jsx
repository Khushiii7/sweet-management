import React, { useState } from "react";
import { register } from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const res = await register(username, email, password);
    if (res.status === 201) {
      setMsg("Registered! Please login.");
      setTimeout(() => navigate("/login"), 1000);
    } else {
      const j = await res.json();
      setMsg(j.detail || "Registration failed");
    }
  }

  return (
    <div className="card">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
      {msg && <div className="info">{msg}</div>}
    </div>
  );
}
