const express = require("express");
const cors = require("cors");

const app = express();

// ===== CORS =====
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// ===== BODY PARSER =====
app.use(express.json());

// ===== ROUTES =====
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/livestreams", require("./routes/channel.routes"));

// ===== HEALTH CHECK (optional but good) =====
app.get("/", (req, res) => {
  res.send("✅ PlayOn Backend Running");
});

module.exports = app;
