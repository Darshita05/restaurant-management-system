import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// Background import
import bgImg from "../assets/r.jpg";

import pizzaImg1 from "../assets/p.jpg";   
import pizzaImg2 from "../assets/p1.png.jpg";  
import burgerImg1 from "../assets/b1.jpg"; 
import burgerImg2 from "../assets/chees.jpg"; 
import dosaImg from "../assets/d.jpg";
import sandwichImg from "../assets/s.jpg";
import drinksImg from "../assets/c1.jpg";

const Menu = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Guest");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) setUserName(user.name);

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const menuItems = [
    { name: "Margerita Pizza", price: 199, time: 15, category: "Pizza", img: pizzaImg1 },
    { name: "Farmhouse Pizza", price: 249, time: 20, category: "Pizza", img: pizzaImg2 }, // Alag Image!
    { name: "Veg Burger", price: 99, time: 10, category: "Burger", img: burgerImg1 },
    { name: "Cheese Burger", price: 129, time: 12, category: "Burger", img: burgerImg2 }, // Alag Image!
    { name: "Masala Dosa", price: 120, time: 15, category: "South Indian", img: dosaImg },
    { name: "Veg Sandwich", price: 80, time: 8, category: "Sandwich", img: sandwichImg },
    { name: "Cold Coffee", price: 110, time: 5, category: "Drinks", img: drinksImg },
  ];

  const addToCart = (item) => {
    const existingItem = cart.find((i) => i.name === item.name);
    let newCart;
    if (existingItem) {
      newCart = cart.map((i) => i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i);
    } else {
      newCart = [...cart, { ...item, quantity: 1 }];
    }
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    alert(`${item.name} added to cart!`);
  };

  const getInitial = () => userName.charAt(0).toUpperCase();

  return (
    <div style={pageStyle}>
      <style>{`
        .nav-link { color: white; text-decoration: none; font-size: 18px; font-weight: 500; transition: 0.3s; position: relative; }
        .nav-link:hover { color: orange; }
        .user-avatar { 
          width: 40px; height: 40px; background: orange; color: white; border-radius: 50%; 
          display: flex; justify-content: center; align-items: center; font-weight: bold; cursor: pointer;
        }
        .menu-card {
          background: rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 25px;
          padding: 20px;
          width: 260px;
          text-align: center;
          transition: 0.4s;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .menu-card:hover { transform: translateY(-10px); border-color: orange; }
        .order-btn {
          background: orange; color: white; border: none; padding: 10px 25px; border-radius: 50px;
          font-weight: bold; cursor: pointer; transition: 0.3s; width: 100%; margin-top: 15px;
        }
        .order-btn:hover { background: #e67e22; transform: scale(1.05); }
        .go-to-cart {
          position: fixed; bottom: 30px; right: 30px; background: #27ae60; color: white;
          padding: 15px 30px; border-radius: 50px; text-decoration: none; font-weight: bold;
          box-shadow: 0 10px 20px rgba(0,0,0,0.4); z-index: 1000; transition: 0.3s;
        }
      `}</style>

      {/* Navigation */}
      <nav style={navStyle}>
        <div style={{ color: 'orange', fontSize: '28px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => navigate("/home")}>VegBite</div>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/menu" className="nav-link" style={{color: 'orange'}}>Menu</Link>
          <Link to="/order" className="nav-link">My Order</Link>
          <div className="user-avatar">{getInitial()}</div>
        </div>
      </nav>

      {/* Menu Grid */}
      <div style={{ padding: '120px 50px 50px', textAlign: 'center' }}>
        <h1 style={titleStyle}>✨ Premium Menu ✨</h1>
        <div style={gridStyle}>
          {menuItems.map((item, index) => (
            <div key={index} className="menu-card">
              <img src={item.img} alt={item.name} style={imgStyle} />
              <h3 style={{margin: '15px 0 5px', fontSize: '20px'}}>{item.name}</h3>
              <div style={{fontSize: '22px', fontWeight: 'bold', color: 'orange'}}>₹{item.price}</div>
              <button className="order-btn" onClick={() => addToCart(item)}>Add to Order</button>
            </div>
          ))}
        </div>
      </div>

      <Link to="/order" className="go-to-cart">View My Order ({cart.length}) 🛒</Link>
    </div>
  );
};

// Styles
const pageStyle = { minHeight: "100vh", backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url(${bgImg})`, backgroundSize: "cover", backgroundAttachment: "fixed", color: "white" };
const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 50px', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', position: 'fixed', top: 0, width: '100%', zIndex: 1000, boxSizing: 'border-box' };
const titleStyle = { fontSize: '48px', fontWeight: '800', marginBottom: '50px' };
const gridStyle = { display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' };
const imgStyle = { width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '3px solid orange' };

export default Menu;