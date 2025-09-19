import React, { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login({ onToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const data = await login(username, password);
      if (data.access_token) {
        onToken(data.access_token);
        navigate("/");
      } else {
        setErr("Login failed");
      }
    } catch (e) {
      setErr("Login error");
    }
  }

  return (
    <div className="card">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {err && <div className="error">{err}</div>}
    </div>
  );
}
