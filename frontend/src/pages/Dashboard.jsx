import React, { useEffect, useState } from "react";
import { getSweets, purchaseSweet } from "../api";

export default function Dashboard({ token }) {
  const [sweets, setSweets] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getSweets();
        setSweets(data);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, [token]);

  async function buy(id) {
    try {
      await purchaseSweet(id, 1);
      setSweets((prev) => prev.map(s => s.id === id ? { ...s, quantity: s.quantity - 1 } : s));
    } catch (err) {
      alert("Purchase error");
    }
  }

  return (
    <div>
      <h1>Available Sweets</h1>
      <div className="grid">
        {sweets.map(s => (
          <div key={s.id} className="card">
            <h3>{s.name}</h3>
            <p>Category: {s.category}</p>
            <p>Price: ₹{s.price}</p>
            <p>Stock: {s.quantity}</p>
            <button onClick={() => buy(s.id)} disabled={s.quantity === 0}>Purchase</button>
          </div>
        ))}
      </div>
    </div>
  );
}
