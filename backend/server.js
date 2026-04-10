require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/order");

// middleware
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// health check route
app.get("/", (req, res) => {
  res.send("DapStore backend running 🚀");
});

// DB CONNECT
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});