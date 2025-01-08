const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/income.controller.js");
const authenticate = require("../middleware/authenticate.js");

router.get("/", authenticate, incomeController.getAllIncomes);
router.get("/:id", authenticate, incomeController.getSingleIncome);
router.post("/", authenticate, incomeController.addIncome);
router.put("/:id", authenticate, incomeController.updateIncome);
router.delete("/:id", authenticate, incomeController.deleteIncome);

module.exports = router;
