const mongoose = require("mongoose");
const Order = require("../models/orderModel");
const Customer = require("../models/customerModel");
const Product = require("../models/productModel");

async function addOrder(req, res) {
  const { customerId, productIds, totalPrice, status } = req.body;

  try {
    const [customer, products] = await Promise.all([
      Customer.findById(customerId),
      Product.find({ _id: { $in: productIds } }),
    ]);

    if (!customer || products.length !== productIds.length) {
      return res
        .status(404)
        .json({ error: "Pelanggan atau produk tidak ditemukan" });
    }

    const order = new Order({
      customer: customer._id,
      products: productIds,
      totalPrice,
      status,
    });

    await order.save();

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan saat membuat pesanan" });
  }
}

async function getOrderById(req, res) {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Pesanan tidak ditemukan" });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
}

async function updateOrder(req, res) {
  try {
    const orderId = req.params.id;
    const updatedData = req.body;
    const order = await Order.findByIdAndUpdate(orderId, updatedData, {
      new: true,
    });
    if (!order) {
      return res.status(404).json({ error: "Pesanan tidak ditemukan" });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
}

async function deleteOrder(req, res) {
  try {
    const orderId = req.params.id;
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(404).json({ error: "Pesanan tidak ditemukan" });
    }
    res.json({ message: "Pesanan berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
}

module.exports = {
  addOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
};
