const Customer = require("../models/customerModel");

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addCustomer = async (req, res) => {
  try {
    const customerData = req.body;
    const newCustomer = new Customer(customerData);
    const customer = await newCustomer.save();
    res.status(201).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const customerData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };
    const customer = await Customer.findByIdAndUpdate(id, customerData, { new: true });
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
      console.log("Customer not found");
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};
