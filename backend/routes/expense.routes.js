const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense.controller.js");
const authenticate = require("../middleware/authenticate.js");

router.get("/", authenticate, expenseController.getAllExpenses);
router.get("/:id", authenticate, expenseController.getSingleExpense);
router.post("/", authenticate, expenseController.addExpense);
router.put("/:id", authenticate, expenseController.updateExpense);
router.delete("/:id", authenticate, expenseController.deleteExpense);

module.exports = router;
