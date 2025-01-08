const express = require("express");
const router = express.Router();
const binController = require("../controllers/bin.controller.js");
const authenticate = require("../middleware/authenticate.js");

router.get("/", authenticate, binController.getAllBinRecords);
router.post("/:id", authenticate, binController.recoverBinRecord);
router.delete("/:id", authenticate, binController.deleteBinRecord);

module.exports = router;
