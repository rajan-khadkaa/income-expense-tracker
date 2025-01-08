const express = require("express");
const dashboardController = require("../controllers/dashboard.controller.js");
const router = express.Router();
const authenticate = require("../middleware/authenticate.js");

router.get(
  "/recentTransactions",
  authenticate,
  dashboardController.getRecentTransactions
);

router.get("/totalIncome", authenticate, dashboardController.getTotalIncome);
router.get("/totalExpense", authenticate, dashboardController.getTotalExpense);
router.get("/lastMonthSaving", authenticate, dashboardController.getSavings);
router.get(
  "/recentTransactions",
  authenticate,
  dashboardController.getRecentTransactions
);
router.get(
  "/lastFourMonthTransaction",
  authenticate,
  dashboardController.getLastFourMonths
);

module.exports = router;
