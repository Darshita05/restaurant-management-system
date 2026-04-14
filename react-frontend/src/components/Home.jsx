import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// 1. IMPORT BACKGROUND IMAGE (Matches your assets folder structure)
import bgImg from "../assets/r.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Guest");

  // Logic: Local Storage se user ka naam lena jab page load ho
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      setUserName(user.name);
    }
  }, []);

  // Logic: Naam ka pehla letter nikalna Avatar ke liye
  const getInitial = () => {
    return userName.charAt(0).toUpperCase();
  };

  return (
    <div className="home-page" style={pageStyle}>
      {/* 2. STYLE TAG for Hover Effects & Global Classes */}
      <style>{`
        .nav-link {
          color: white;
          text-decoration: none;
          font-size: 18px;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
        }
        .nav-link:hover {
          color: orange;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -5px;
          left: 0;
          background-color: orange;
          transition: width 0.3s;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        
        .order-btn {
          padding: 15px 40px;
          background-color: orange;
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(255, 165, 0, 0.4);
        }
        .order-btn:hover {
          background-color: #e67e22;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(255, 165, 0, 0.6);
        }
        
        .user-avatar {
          width: 45px;
          height: 45px;
          background-color: orange;
          color: white;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 22px;
          font-weight: bold;
          cursor: pointer;
          margin-left: 15px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          transition: 0.3s;
        }
        .user-avatar:hover {
          transform: scale(1.1);
        }
      `}</style>

      {/* 3. NAVIGATION BAR */}
      <nav style={navStyle}>
        <div style={logoStyle}>VegBite</div>
        <div style={navLinksStyle}>
          <Link to="/home" className="nav-link" style={{color: 'orange'}}>Home</Link>
          <Link to="/menu" className="nav-link">Menu</Link>
          <Link to="/order" className="nav-link">My Order</Link>
          <Link to="/payment" className="nav-link">Payment</Link>
          
          {/* USER AVATAR (Round box with initial) */}
          <div className="user-avatar" title={`Welcome, ${userName}`}>
            {getInitial()}
          </div>
        </div>
      </nav>

      {/* 4. MAIN CONTENT SECTION */}
      <div style={heroSectionStyle}>
        {/* Glassmorphism Hero Box */}
        <div style={heroBoxStyle}>
          <h1 style={welcomeHeadingStyle}>Welcome to VegBite</h1>
          <p style={subHeadingStyle}>Delicious Vegetarian Food, Ready in Minutes!</p>
          <p style={{color: '#ddd', fontSize: '16px', marginBottom: '30px'}}>
            Experience the finest vegetarian cuisine from the comfort of your home. 
            Fresh items, fast delivery.
          </p>
          <button className="order-btn" onClick={() => navigate("/menu")}>
            Order Now 🍽️
          </button>
        </div>
      </div>
    </div>
  );
};

// --- STYLES (Inline objects for cleaner structure) ---

const pageStyle = {
  fontFamily: "'Poppins', sans-serif",
  minHeight: "100vh",
  backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${bgImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed", 
  margin: 0,
  padding: 0,
};

// Navigation Bar Styles
const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 50px",
  background: "rgba(0, 0, 0, 0.7)", 
  backdropFilter: "blur(10px)", // Glass effect on nav
  position: "fixed",
  top: 0,
  width: "100%",
  zIndex: 1000,
  boxSizing: "border-box",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
};

const logoStyle = {
  fontSize: "30px",
  fontWeight: "bold",
  color: "orange",
  fontFamily: "'Playfair Display', serif", // Premium logo font
};

const navLinksStyle = {
  display: "flex",
  alignItems: "center",
  gap: "30px",
};

// Main Hero Section (Content in middle)
const heroSectionStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  paddingTop: "80px", // Navbar height adjustment
  boxSizing: "border-box",
};

// Central Glass Box for Welcome Text
const heroBoxStyle = {
  background: "rgba(255, 255, 255, 0.08)", // Very transparent white
  backdropFilter: "blur(15px)", // Glass effect
  padding: "50px 70px",
  borderRadius: "30px",
  maxWidth: "700px",
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
};

const welcomeHeadingStyle = {
  fontSize: "65px",
  color: "white",
  margin: "0 0 15px 0",
  fontWeight: "800",
  textTransform: "uppercase",
  letterSpacing: "2px",
  fontFamily: "'Playfair Display', serif",
};

const subHeadingStyle = {
  fontSize: "24px",
  color: "orange",
  margin: "0 0 25px 0",
  fontWeight: "400",
  fontStyle: "italic",
};

export default Home;