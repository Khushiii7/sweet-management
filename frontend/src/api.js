// frontend/src/api.js
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

function getToken() {
  return localStorage.getItem("token");
}
function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function register(username, email, password) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  return res;
}

export async function login(username, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function getSweets() {
  const res = await fetch(`${API_BASE}/sweets`, {
    headers: { ...authHeaders() },
  });
  return res.json();
}

export async function purchaseSweet(id, quantity = 1) {
  const res = await fetch(`${API_BASE}/sweets/${id}/purchase`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ quantity }),
  });
  return res.json();
}

export async function addSweet(payload) {
  const res = await fetch(`${API_BASE}/sweets`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function restockSweet(id, quantity) {
  const res = await fetch(`${API_BASE}/sweets/${id}/restock`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ quantity }),
  });
  return res.json();
}

export async function deleteSweet(id) {
  const res = await fetch(`${API_BASE}/sweets/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
  return res;
}
