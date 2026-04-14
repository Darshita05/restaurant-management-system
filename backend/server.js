const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json());

// Database Connection
mongoose.connect("mongodb://127.0.0.1:27017/vegBiteDB")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ DB Error:", err));

// User Model
const User = mongoose.model("User", new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" }
}));

// SIGNUP ROUTE
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// LOGIN ROUTE
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Email" });

    const isMatch = await bcrypt.compare(password, user.password); // FIXED: Added await
    if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.listen(5000, () => console.log("🚀 Server: http://localhost:5000"));