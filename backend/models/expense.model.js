const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter expense title"],
    },
    desc: {
      type: String,
      required: [true, "Please enter the description"],
    },
    amount: {
      type: Number,
      required: [true, "Please enter the amount"],
    },
    date: {
      type: Date,
      required: [true, "Please enter the date."],
      default: Date.now,
    },

    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
