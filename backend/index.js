const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

const incomeRoutes = require("./routes/income.routes.js");
const expenseRoutes = require("./routes/expense.routes.js");
const binRoutes = require("./routes/bin.routes.js");
const userRoutes = require("./routes/user.routes.js");
const dashboardRoutes = require("./routes/dashboard.routes.js");

// this lets to use json in nodejs (when getting the json from frontend)
app.use(express.json());
app.use(
  cors({
    origin: "https://income-expense-haql.onrender.com",
    credentials: true,
  })
);

const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL;

dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/bin", binRoutes);
app.use("/api/user", userRoutes);
app.use("/api/dashboard", dashboardRoutes);

mongoose
  .connect(MONGO_URL, { dbName: "inc-exp" })
  .then(() => {
    console.log("Database Connected");
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
