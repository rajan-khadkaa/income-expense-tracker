const Expense = require("../models/expense.model.js");
const Bin = require("../models/bin.model.js");

exports.getAllExpenses = async (req, res) => {
  try {
    const all_exp = await Expense.find({ userId: req.user.id });
    if (!all_exp)
      return res.status(404).json({ message: "No expense records." });
    res.status(200).json(all_exp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSingleExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const loggedUser = req.user.id;
    const single_exp = await Expense.findOne({ _id: id, userId: loggedUser });
    if (!single_exp)
      return res.status(404).json({ message: "No expense record found" });
    res.status(200).json(single_exp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addExpense = async (req, res) => {
  try {
    const expenseData = req.body;
    const userId = req.user.id;
    await Expense.create({ ...expenseData, userId });
    res.status(200).json({ message: "Expense added successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const up_exp = await Expense.findOneAndUpdate(
      { _id: id, userId },
      req.body
    );
    if (!up_exp)
      return res.status(404).json({ message: "Expense record not found." });
    // const updatedExp = await Expense.findById(id);
    res.status(200).json({ message: "Expense updated successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const record = await Expense.findOne({ _id: id, userId });
    if (!record) res.status(404).json({ message: "Expense record not found." });

    //toObject() changes the complex mongo object with extra info like id to plain javascript object
    const recordObj = { ...record.toObject(), parent: "expense" };

    const moveToBin = await Bin.create(recordObj);
    if (moveToBin) {
      await Expense.findOneAndDelete({ _id: id, userId });
      return res
        .status(500)
        .json({ message: "Expense record deleted successfully" });
    } else {
      return res
        .status(500)
        .json({ message: "Failed to move the record to bin." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
