import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import bgImg from "../assets/r.jpg";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [initial, setInitial] = useState("?");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) setInitial(user.name.charAt(0).toUpperCase());
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // FIXED: Path changed from /register to /signup to match your backend
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration Successful! Please Login.");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      alert("Server is not running. Please start your Node.js backend!");
    }
  };

  return (
    <div style={pageStyle}>
      <style>{`
        .nav-link { color: white; text-decoration: none; font-size: 18px; transition: 0.3s; }
        .nav-link:hover { color: orange; }
        .user-avatar { width: 40px; height: 40px; background: orange; color: white; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: bold; }
      `}</style>

      <nav style={navStyle}>
        <div style={{ color: 'orange', fontSize: '28px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => navigate("/")}>VegBite</div>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/menu" className="nav-link">Menu</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <div className="user-avatar">{initial}</div>
        </div>
      </nav>

      <div style={glassCardStyle}>
        <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>Join Us</h2>
        <form onSubmit={handleRegister} style={formStyle}>
          <input type="text" placeholder="Full Name" required style={inputStyle} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" required style={inputStyle} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required style={inputStyle} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" style={btnStyle}>Sign Up</button>
        </form>
        <p style={{ marginTop: '20px' }}>Already have an account? <Link to="/login" style={{ color: 'orange', textDecoration: 'none' }}>Login</Link></p>
      </div>
    </div>
  );
};

const pageStyle = { minHeight: "100vh", backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${bgImg})`, backgroundSize: "cover", display: "flex", alignItems: "center", justifyContent: "center", color: "white", paddingTop: "80px" };
const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 50px', background: 'rgba(0,0,0,0.9)', position: 'fixed', top: 0, width: '100%', zIndex: 1000, boxSizing: 'border-box' };
const glassCardStyle = { background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(15px)", padding: "40px", borderRadius: "30px", border: "1px solid rgba(255, 255, 255, 0.2)", width: "380px", textAlign: "center" };
const formStyle = { display: "flex", flexDirection: "column", gap: "20px" };
const inputStyle = { padding: "15px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.1)", color: "white", outline: "none" };
const btnStyle = { padding: "15px", borderRadius: "50px", border: "none", background: "orange", color: "white", fontWeight: "bold", cursor: "pointer", fontSize: "18px" };

export default Register;