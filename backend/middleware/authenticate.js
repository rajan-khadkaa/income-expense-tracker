require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authenticate = async (req, res, next) => {
  //this applies chaining that if token is not there then gives it null value and if it has value then
  //the keyword "Bearer" is seperated using split and then get indexed 1 value i.e. token
  // console.log("Headers received: ", req.headers);
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res.status(403).json({ message: "No token, access denied" });

  try {
    const verified = jwt.verify(token, JWT_SECRET_KEY);
    // console.log("verified value is: ", verified);
    req.user = verified;
    // console.log("jwtdecoded user id is: ", req.user.id);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = authenticate;
