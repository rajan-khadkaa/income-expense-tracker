const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const regUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    // console.log("name email and password: ", regUser);
    res.status(200).json(regUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      const decPassword = await bcrypt.compare(password, checkUser.password);
      if (decPassword) {
        try {
          const token = jwt.sign(
            { id: checkUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "20h" }
          );
          // console.log("token being sent to frontend by controller: ", token);
          res.status(200).json({ token });
          // res.cookie("token", token, { httpOnly: true });
          // res.status(200).json({ message: "Login successful", token });
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      } else {
        res.status(400).json({ message: "Incorect password." });
      }
    } else {
      res.status(404).json({ message: "Email not registered." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    // res.clearCookie("token", { httpOnly: true });
    res.status(200).json({ message: "User logged out." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
