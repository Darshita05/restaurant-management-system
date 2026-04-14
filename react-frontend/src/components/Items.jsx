import React from "react";

const Items = () => {
  const orderItem = (name, time, price, img) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let found = cart.find((item) => item.name === name);

    if (found) {
      found.quantity += 1;
    } else {
      cart.push({ name, time, price, img, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
  };

  return (
    <div className="items-page">
      <style>{`
        .items-page {
          margin: 0; font-family: Arial; color: white; padding: 20px; min-height: 100vh;
          background: linear-gradient(rgba(15,44,51,0.9), rgba(15,44,51,0.9)), url("/assets/r.jpg") fixed center/cover;
        }
        h1 { text-align: center; font-size: 36px; color: gold; margin-bottom: 30px; }
        h2 { border-left: 5px solid orange; padding-left: 10px; margin-top: 40px; color: #ffb347; }
        .menu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-top: 20px; }
        .card { background: rgba(255,255,255,0.1); padding: 15px; border-radius: 15px; text-align: center; transition: 0.3s; border: 1px solid rgba(255,255,255,0.1); }
        .card:hover { transform: translateY(-10px); background: rgba(255,255,255,0.2); }
        .card img { width: 100%; height: 150px; object-fit: cover; border-radius: 10px; }
        .card button { width: 100%; padding: 10px; background: orange; border: none; color: white; border-radius: 5px; cursor: pointer; margin-top: 10px; font-weight: bold; }
      `}</style>

      <h1>Premium Menu Items</h1>

      {/* PIZZA CATEGORY */}
      <h2 id="pizza">🍕 Pizza</h2>
      <div className="menu-grid">
        <div className="card">
          <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591" alt="Pizza" />
          <h3>Margherita</h3>
          <p>₹199 | 10 min</p>
          <button onClick={() => orderItem('Margherita', 10, 199, 'p1.jpg')}>Order</button>
        </div>
        <div className="card">
          <img src="https://images.unsplash.com/photo-1594007654729-407eedc4be65" alt="Pizza" />
          <h3>Farmhouse</h3>
          <p>₹249 | 12 min</p>
          <button onClick={() => orderItem('Farmhouse', 12, 249, 'p2.jpg')}>Order</button>
        </div>
      </div>

      {/* BURGER CATEGORY */}
      <h2 id="burger">🍔 Burger</h2>
      <div className="menu-grid">
        <div className="card">
          <img src="https://images.unsplash.com/photo-1550547660-d9450f859349" alt="Burger" />
          <h3>Veg Burger</h3>
          <p>₹99 | 5 min</p>
          <button onClick={() => orderItem('Veg Burger', 5, 99, 'b1.jpg')}>Order</button>
        </div>
      </div>
    </div>
  );
};

export default Items;