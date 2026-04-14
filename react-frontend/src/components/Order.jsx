import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";

// 1. ASSETS IMPORT
import bgImg from "../assets/r.jpg";
import pizzaImg from "../assets/p.jpg";
import burgerImg from "../assets/b1.jpg";
import dosaImg from "../assets/d.jpg";
import sandwichImg from "../assets/s.jpg";
import drinksImg from "../assets/c1.jpg";

const Order = () => {
  const [cart, setCart] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  // Kitchen Busy Time 
  const [kitchenBusyTime] = useState(15); 
  const navigate = useNavigate();

  const imageMap = { pizzaImg, burgerImg, dosaImg, sandwichImg, drinksImg };

  // 2. USECALLBACK: To solve 'missing dependency' warning
  const calculateItemsTime = useCallback(() => {
    return cart.reduce((sum, item) => sum + (item.time * item.quantity), 0);
  }, [cart]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const gst = subtotal * 0.18;
  const itemsPrepTime = calculateItemsTime();
  const totalWaitTime = itemsPrepTime + kitchenBusyTime; // Logic: Items + Busy Kitchen
  const totalAmount = subtotal + gst;

  // 3. TIMER LOGIC with dependency fixes
  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      
      // ALERTS
      const initialSeconds = (calculateItemsTime() + kitchenBusyTime) * 60;
      if (timeLeft === Math.floor(initialSeconds / 2)) {
        alert("⏳ Half order is prepared! Almost there.");
      }
      if (timeLeft === 1) {
        alert("✅ Your order is ready at the counter!");
      }
    }
    return () => clearTimeout(timer);
  }, [timeLeft, calculateItemsTime, kitchenBusyTime]);

  const updateQty = (name, delta) => {
    const updated = cart.map(item => 
      item.name === name ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
    setTimeLeft(0);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div style={pageBg}>
      {/* 🧭 NAVIGATION */}
      <nav style={navBar}>
        <div style={logo}>VegBite</div>
        <div style={navLinks}>
          <Link to="/home" style={link}>Home</Link>
          <Link to="/menu" style={link}>Menu</Link>
          <Link to="/order" style={{...link, color: 'orange', borderBottom: '2px solid orange'}}>My Order</Link>
          <Link to="/payment" style={link}>Payment</Link>
        </div>
      </nav>

      <div style={contentWrapper}>
        {/* 🛒 ITEM LIST */}
        <div style={itemGrid}>
          {cart.length === 0 ? <h2 style={{color: 'white'}}>Your cart is empty.</h2> : 
            cart.map((item, index) => (
              <div key={index} style={itemCard}>
                <img src={imageMap[item.imgKey] || dosaImg} alt={item.name} style={imgStyle} />
                <h3 style={{margin: '10px 0'}}>{item.name}</h3>
                <p style={{color: '#aaa'}}>₹{item.price} | ⏳ {item.time} min</p>
                <div style={qtyBox}>
                  <button style={qtyBtn} onClick={() => updateQty(item.name, -1)}>-</button>
                  <span style={{fontSize: '18px'}}>{item.quantity}</span>
                  <button style={qtyBtn} onClick={() => updateQty(item.name, 1)}>+</button>
                </div>
              </div>
            ))
          }
        </div>

        {/* 🧾 SUMMARY SECTION */}
        <div style={summaryBox}>
          <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Order Summary</h2>
          
          <div style={row}><span>Current Kitchen Load:</span> <span>{kitchenBusyTime} min</span></div>
          <div style={row}><span>Your Items Prep:</span> <span>{itemsPrepTime} min</span></div>
          <div style={totalTimeRow}>
            <span>Total Waiting Time:</span> <span>{totalWaitTime} min</span>
          </div>
          <hr style={{margin: '20px 0'}}/>
          <div style={row}><span>Subtotal:</span> <span>₹{subtotal}</span></div>
          <div style={row}><span>GST (18%):</span> <span>₹{gst.toFixed(2)}</span></div>
          <div style={grandTotal}><span>Total:</span> <span>₹{totalAmount.toFixed(2)}</span></div>

          {timeLeft > 0 && (
            <div style={timerBox}>⏳ Estimated Wait: {formatTime(timeLeft)}s</div>
          )}

          <button style={btnStart} onClick={() => setTimeLeft(totalWaitTime * 60)}>Start Timer</button>
          <button style={btnPay} onClick={() => navigate("/payment")}>Proceed to Payment</button>
          <button style={btnClear} onClick={clearCart}>Clear Order</button>
        </div>
      </div>
    </div>
  );
};

// --- STYLES ---
const pageBg = { backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.85)), url(${bgImg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', minHeight: '100vh', color: 'white' };
const navBar = { display: 'flex', justifyContent: 'space-between', padding: '15px 50px', background: 'rgba(0,0,0,0.9)', position: 'fixed', top: 0, width: '100%', zIndex: 1000, boxSizing: 'border-box' };
const logo = { fontSize: '26px', fontWeight: 'bold', color: 'orange' };
const navLinks = { display: 'flex', gap: '25px', alignItems: 'center' };
const link = { color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '17px' };
const contentWrapper = { display: 'flex', gap: '40px', padding: '120px 50px 50px', flexWrap: 'wrap', justifyContent: 'center' };
const itemGrid = { flex: 2, display: 'flex', flexWrap: 'wrap', gap: '20px', minWidth: '300px' };
const itemCard = { background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '20px', width: '220px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' };
const imgStyle = { width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid orange' };
const qtyBox = { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginTop: '10px' };
const qtyBtn = { background: 'orange', border: 'none', borderRadius: '50%', width: '30px', height: '30px', color: 'white', cursor: 'pointer', fontWeight: 'bold' };
const summaryBox = { width: '360px', background: 'white', color: '#333', borderRadius: '25px', padding: '30px', height: 'fit-content', boxShadow: '0 15px 35px rgba(0,0,0,0.5)' };
const row = { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' };
const totalTimeRow = { display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: '#e67e22', marginTop: '10px' };
const grandTotal = { display: 'flex', justifyContent: 'space-between', fontSize: '24px', fontWeight: 'bold', color: '#27ae60', marginTop: '15px' };
const timerBox = { background: '#fcf3cf', color: '#9a7d0a', padding: '12px', borderRadius: '10px', textAlign: 'center', fontWeight: 'bold', margin: '15px 0' };
const btnStart = { width: '100%', padding: '12px', background: '#e67e22', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '10px' };
const btnPay = { width: '100%', padding: '12px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '10px' };
const btnClear = { width: '100%', padding: '12px', background: '#ecf0f1', color: '#e74c3c', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' };

export default Order;