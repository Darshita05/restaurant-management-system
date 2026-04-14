import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bgImg from "../assets/r.jpg"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login Successful!");
        // Direct redirection using window.location to ensure Home page loads fresh
        window.location.href = "/home";
      } else {
        alert(data.message || "Invalid Email or Password");
      }
    } catch (err) {
      alert("Check if your Backend Server is running!");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={glassCardStyle}>
        <h2 style={{ fontSize: '32px' }}>Welcome Back</h2>
        <form onSubmit={handleLogin} style={formStyle}>
          <input type="email" placeholder="Email" required style={inputStyle} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required style={inputStyle} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" style={btnStyle}>Login</button>
        </form>
        <p style={{ marginTop: '20px' }}>New? <Link to="/register" style={{ color: 'orange' }}>Sign Up</Link></p>
      </div>
    </div>
  );
};

const pageStyle = { minHeight: "100vh", backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${bgImg})`, backgroundSize: "cover", display: "flex", alignItems: "center", justifyContent: "center", color: "white" };
const glassCardStyle = { background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(15px)", padding: "40px", borderRadius: "30px", width: "380px", textAlign: "center" };
const formStyle = { display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" };
const inputStyle = { padding: "15px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.1)", color: "white" };
const btnStyle = { padding: "15px", borderRadius: "50px", border: "none", background: "orange", color: "white", fontWeight: "bold", cursor: "pointer" };

export default Login;