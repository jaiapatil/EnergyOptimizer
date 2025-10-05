import express from "express";
import Company from "../models/company.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "fallbackSecret"; 

// POST: Login
router.post("/login", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const company = await Company.findOne({ name, email });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, company.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: company._id, name: company.name, email: company.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login Successful",
      token,
      companyData: company,
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/verify", async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
  
    try {
      
      const decoded = jwt.verify(token, JWT_SECRET);
  
      
      const company = await Company.findById(decoded.id);
  
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
  
      res.json({
        valid: true,
        companyData: company,
      });
    } catch (err) {
      console.error("Verify error:", err);
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  });


export default router;
