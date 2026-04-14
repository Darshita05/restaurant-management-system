import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import bgImg from "../assets/r.jpg"; 

const Payment = () => {
  const [initial, setInitial] = useState("?");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) setInitial(user.name.charAt(0).toUpperCase());
  }, []);

  const handlePayment = (e) => {
    e.preventDefault();
    alert("Payment Successful! Your food is on the way. 🍕");
    navigate("/home");
  };

  return (
    <div style={pageStyle}>
      <style>{`
        .nav-link { color: white; text-decoration: none; font-size: 18px; transition: 0.3s; }
        .nav-link:hover { color: orange; }
        .user-avatar { width: 40px; height: 40px; background: orange; color: white; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: bold; }
        .payment-option { 
            background: rgba(255,255,255,0.1); 
            padding: 15px; 
            border-radius: 12px; 
            margin-bottom: 10px; 
            cursor: pointer; 
            border: 1px solid rgba(255,255,255,0.2);
            display: flex;
            align-items: center;
            gap: 15px;
            transition: 0.3s;
        }
        .payment-option:hover { background: rgba(255,165,0,0.2); }
        .active-option { border: 2px solid orange; background: rgba(255,165,0,0.1); }
      `}</style>

      {/* Navigation (Matching your other pages) */}
      <nav style={navStyle}>
        <div style={{ color: 'orange', fontSize: '28px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => navigate("/home")}>VegBite</div>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/menu" className="nav-link">Menu</Link>
          <Link to="/order" className="nav-link">My Order</Link>
          <div className="user-avatar">{initial}</div>
        </div>
      </nav>

      {/* Payment Glass Card */}
      <div style={glassCardStyle}>
        <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>Checkout</h2>
        <p style={{ color: 'orange', marginBottom: '25px' }}>Select your payment method</p>

        <div style={{ textAlign: 'left', marginBottom: '20px' }}>
          <div 
            className={`payment-option ${paymentMethod === 'card' ? 'active-option' : ''}`}
            onClick={() => setPaymentMethod('card')}
          >
            <input type="radio" checked={paymentMethod === 'card'} readOnly />
            <span>Credit / Debit Card</span>
          </div>

          <div 
            className={`payment-option ${paymentMethod === 'upi' ? 'active-option' : ''}`}
            onClick={() => setPaymentMethod('upi')}
          >
            <input type="radio" checked={paymentMethod === 'upi'} readOnly />
            <span>UPI (Google Pay / PhonePe)</span>
          </div>

          <div 
            className={`payment-option ${paymentMethod === 'cod' ? 'active-option' : ''}`}
            onClick={() => setPaymentMethod('cod')}
          >
            <input type="radio" checked={paymentMethod === 'cod'} readOnly />
            <span>Cash on Delivery</span>
          </div>
        </div>

        {/* Dynamic Form based on selection */}
        <form onSubmit={handlePayment} style={formStyle}>
          {paymentMethod === 'card' && (
            <>
              <input type="text" placeholder="Card Number" required style={inputStyle} />
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="MM/YY" required style={inputStyle} />
                <input type="text" placeholder="CVV" required style={inputStyle} />
              </div>
            </>
          )}

          {paymentMethod === 'upi' && (
            <input type="text" placeholder="Enter UPI ID (e.g. user@okaxis)" required style={inputStyle} />
          )}

          {paymentMethod === 'cod' && (
            <p style={{ padding: '10px', color: '#ccc' }}>Pay securely at your doorstep!</p>
          )}

          <button type="submit" style={btnStyle}>Pay Now</button>
        </form>
      </div>
    </div>
  );
};

// Styles (Keeping it consistent with Login/Register)
const pageStyle = { 
    minHeight: "100vh", 
    backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${bgImg})`, 
    backgroundSize: "cover", 
    backgroundPosition: "center",
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    color: "white", 
    paddingTop: "80px" 
};

const navStyle = { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '15px 50px', 
    background: 'rgba(0,0,0,0.9)', 
    backdropFilter: 'blur(10px)', 
    position: 'fixed', 
    top: 0, 
    width: '100%', 
    zIndex: 1000, 
    boxSizing: 'border-box' 
};

const glassCardStyle = { 
    background: "rgba(255, 255, 255, 0.1)", 
    backdropFilter: "blur(15px)", 
    padding: "40px", 
    borderRadius: "30px", 
    border: "1px solid rgba(255, 255, 255, 0.2)", 
    width: "420px", 
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
};

const formStyle = { display: "flex", flexDirection: "column", gap: "15px" };

const inputStyle = { 
    padding: "12px", 
    borderRadius: "10px", 
    border: "1px solid rgba(255,255,255,0.3)", 
    background: "rgba(255,255,255,0.1)", 
    color: "white", 
    outline: "none",
    width: "100%",
    boxSizing: "border-box"
};

const btnStyle = { 
    padding: "15px", 
    borderRadius: "50px", 
    border: "none", 
    background: "orange", 
    color: "white", 
    fontWeight: "bold", 
    cursor: "pointer", 
    fontSize: "18px",
    marginTop: "10px"
};

export default Payment;