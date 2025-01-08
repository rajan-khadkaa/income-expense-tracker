const mongoose = require("mongoose");

const binSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    amount: {
      type: Number,
    },
    date: {
      type: Date,
    },
    userId: {
      type: String,
    },
    parent: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Bin = mongoose.model("Bin", binSchema, "bin"); //third arg 'bin' forces to keep collecion name that.
module.exports = Bin;
