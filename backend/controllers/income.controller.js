const Income = require("../models/income.model.js");
const Bin = require("../models/bin.model.js");

exports.getAllIncomes = async (req, res) => {
  try {
    const all_inc = await Income.find({ userId: req.user.id });
    if (!all_inc)
      return res.status(404).json({ message: "No income records." });
    // console.log("data being sent to frontend: ", all_inc);
    res.status(200).json(all_inc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSingleIncome = async (req, res) => {
  try {
    const { id } = req.params;

    // applicable if we just need to find by id but since we need the logged in user id
    //  as well we need to use the findOne query instead
    // const single_income = await Income.findById(id);

    const loggedUser = req.user.id;
    const single_income = await Income.findOne({ _id: id, userId: loggedUser });

    if (!single_income)
      return res.status(404).json({ message: "Income record not found." });
    res.status(200).json(single_income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addIncome = async (req, res) => {
  try {
    const incomeData = req.body;
    // console.log("recently received data: ", incomeData);
    const userId = req.user.id;
    // const dateReceived = incomeData.date;
    // console.log("received date: ", dateReceived);
    // const formattedDate = new Date(dateReceived);
    // formattedDate.setHours(18, 15, 0, 0);
    // console.log("formatted date before inserting is :", formattedDate);
    const addedData = await Income.create({ ...incomeData, userId });
    // console.log("recently added data: ", addedData);
    res.status(200).json({ message: "Income added successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateIncome = async (req, res) => {
  try {
    const userId = req.user.id; //this is user id from authenticate.js after jwt decrypt
    const { id } = req.params;
    const income = await Income.findOneAndUpdate({ _id: id, userId }, req.body);

    if (!income)
      return res.status(404).json({ messsage: "Income record not found." });

    res.status(200).json({ message: "Income updated successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    // const record = await Income.findById(id); //this finds only by id
    const record = await Income.findOne({ _id: id, userId });
    if (!record) res.status(404).json({ message: "Income record not found." });

    //toObject() changes the complex mongo object with extra info like id to plain javascript object
    const recordObj = { ...record.toObject(), parent: "income" };

    const moveToBin = await Bin.create(recordObj);
    if (moveToBin) {
      await Income.findOneAndDelete({ _id: id, userId });
      return res
        .status(200)
        .json({ message: "Income record deleted successfully" });
    } else {
      return res
        .status(500)
        .json({ message: "Failed to delete the income record." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
