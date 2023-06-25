const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.post("/", customerController.addCustomer);
router.patch("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);
router.get("/:id", customerController.getCustomerById);
router.get("/", customerController.getAllCustomers);

module.exports = router;
