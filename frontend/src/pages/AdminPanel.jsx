import React, { useState, useEffect } from "react";
import { addSweet, getSweets, restockSweet, deleteSweet } from "../api";

export default function AdminPanel() {
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({ name: "", category: "", price: "", quantity: "" });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getSweets();
    setSweets(data);
  }

  async function submit(e) {
    e.preventDefault();
    await addSweet({ ...form, price: parseFloat(form.price), quantity: parseInt(form.quantity) });
    setForm({ name: "", category: "", price: "", quantity: "" });
    load();
  }

  async function restock(id) {
    const q = parseInt(prompt("Restock quantity", "5"));
    if (!q) return;
    await restockSweet(id, q);
    load();
  }

  async function remove(id) {
    if (!confirm("Delete sweet?")) return;
    await deleteSweet(id);
    load();
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <form onSubmit={submit} className="card">
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
        <input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} required/>
        <input placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} required/>
        <input placeholder="Quantity" value={form.quantity} onChange={e=>setForm({...form,quantity:e.target.value})} required/>
        <button type="submit">Add Sweet</button>
      </form>

      <div className="grid">
        {sweets.map(s => (
          <div key={s.id} className="card">
            <h3>{s.name} ({s.category})</h3>
            <p>Price: ₹{s.price} | Stock: {s.quantity}</p>
            <button onClick={()=>restock(s.id)}>Restock</button>
            <button onClick={()=>remove(s.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
