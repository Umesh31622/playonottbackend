require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

/* DB */
connectDB();

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* CORS */
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* Routes */
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api", require("./routes/category.routes"));
app.use("/api", require(".//routes/channel.routes"));

/* Health */
app.get("/", (req, res) => {
  res.send("✅ PlayOn Backend Running");
});

/* Server */
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
