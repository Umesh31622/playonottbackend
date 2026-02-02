const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

/* =====================
   LOGIN API
===================== */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // 🔹 Dummy user check (replace with DB later)
  if (email !== "umesh@gmail.com" || password !== "12345") {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET || "secret123",
    { expiresIn: "7d" }
  );

  res.status(200).json({
    token,
    user: { email }
  });
});

module.exports = router;
