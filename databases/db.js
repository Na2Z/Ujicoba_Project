const mongoose = require("mongoose");

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Terhubung ke database MongoDB");
  } catch (error) {
    console.error("Kesalahan koneksi database:", error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
};
module.exports = { connectDB, disconnectDB };
