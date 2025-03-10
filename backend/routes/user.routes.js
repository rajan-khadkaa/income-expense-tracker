const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");

router.post("/register", userController.registerUser);
router.post("/login", userController.verifyUser);
router.get("/logout", userController.logoutUser);

module.exports = router;
