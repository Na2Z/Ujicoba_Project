require("dotenv").config();
const express = require("express");
const orderRoutes = require("./src/routes/orderRoutes");
const customerRoutes = require("./src/routes/customerRoutes");
const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const db = require("./databases/db");
const swaggerSetup = require("./src/swagger/swagger");

// Menghubungkan ke database

db.connectDB().catch(console.log);
function server() {
  const app = express();
  app.use(express.json());

  app.use("/auth", authRoutes); // Rute untuk autentikasi
  app.use("/orders", orderRoutes);
  app.use("/customers", customerRoutes);
  app.use("/product", productRoutes);

  // Setup Swagger
  swaggerSetup.setup(app); // Menggunakan fungsi 'setup' dari objek 'swaggerSetup'
  return app;
}

module.exports = { server };
