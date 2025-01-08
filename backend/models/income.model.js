const mongoose = require("mongoose");

const incomeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter the income title."],
    },

    desc: {
      type: String,
      required: [true, "Please enter the description."],
    },

    amount: {
      type: Number,
      required: [true, "Please enter the income amount."],
      // default: 0 this sets the default value of income to 0 if not received any other
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
    //this sets the created and updated time
    timestamps: true,
  }
);

//this creates a model and then is exported for use in index.js
//also the name used is "Income" as argument but is created plural with 's' and
// all lower case so the collection is "incomes"
const Income = mongoose.model("Income", incomeSchema);
module.exports = Income;
