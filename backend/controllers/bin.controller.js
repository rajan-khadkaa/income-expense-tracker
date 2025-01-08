const Bin = require("../models/bin.model.js");
const Expense = require("../models/expense.model.js");
const Income = require("../models/income.model.js");

exports.getAllBinRecords = async (req, res) => {
  try {
    const allData = await Bin.find({ userId: req.user.id });
    if (!allData) return res.status(500).json({ message: "No records found" });
    res.status(200).json(allData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.recoverBinRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const recover = await Bin.findOne({ _id: id, userId });
    if (!recover) return res.status(404).json({ message: "Record not found." });
    const { title, desc, amount, date, parent } = recover;
    // const checkParent = recover.toObject(); //change mongodb-result object to plain js object (w/o _id etc.)
    // const parentInfo = checkParent.parent; //get the parent to compare and insert into respective collection
    // delete checkParent.parent; //delete the parent property to avoid insertion in parent collection
    // delete checkParent._id; //delete the _id as mongo db will itself give new id. if not deleted then conflict
    if (parent === "expense") {
      await Expense.create({ title, desc, amount, date, userId });
    } else if (parent === "income") {
      await Income.create({ title, desc, amount, date, userId });
    } else {
      return res.status(400).json({ message: "Invalid parent field" });
    }

    await Bin.findByIdAndDelete(id);
    res.status(200).json({ message: "Record restored successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBinRecord = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const deleteRec = await Bin.findOneAndDelete({ _id: id, userId });
  if (!deleteRec)
    return res.status(404).json({ message: "Record not found for deleting." });
  res.status(200).json({ message: "Record deleted from bin." });
};
