const Income = require("../models/income.model.js");
const Expense = require("../models/expense.model.js");

const today = new Date();
const firstDay = new Date(today.getFullYear(), today.getMonth(), 1); //this gets current month's first day
firstDay.setHours(18, 15, 0, 0);
const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0); //this gets current month's last date
lastDay.setHours(18, 15, 0, 0);
// console.log("first day is: ", firstDay);
// console.log("last day is: ", lastDay);
const lstMonthFstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1);
lstMonthFstDay.setHours(18, 15, 0, 0);
const lstMonthLstDay = new Date(today.getFullYear(), today.getMonth(), 0);
lstMonthLstDay.setHours(18, 15, 0, 0);
// console.log("last month's first day: ", lstMonthFstDay);
// console.log("last month last day: ", lstMonthLstDay);

const fourthMonthFstDay = new Date(
  today.getFullYear(),
  today.getMonth() - 4,
  1
);
// console.log("four month's first day is: ", fourthMonthFstDay);

exports.getRecentTransactions = async (req, res) => {
  const userId = req.user.id;
  try {
    const recentIncome = await Income.find({ userId })
      .sort({ date: -1 })
      .limit(5)
      .lean();
    if (!recentIncome)
      return res
        .status(400)
        .json({ message: "Error while getting expense records" });
    // console.log("Recent incomes are: ", getRecentIncome);
    const addTypeIncome = recentIncome.map((data) => ({
      ...data,
      type: "income",
    }));
    // console.log("type added income: ", addTypeIncome);
    // res.status(200).json(addTypeIncome);

    const recentExpense = await Expense.find({ userId })
      .sort({ date: -1 })
      .limit(5)
      .lean();
    if (!recentExpense)
      return res
        .status(400)
        .json({ message: "Error while getting expense records" });
    // console.log("Recent expenses are: ", getRecentExpense);
    const addTypeExpense = recentExpense.map((data) => ({
      ...data,
      type: "expense",
    }));
    // console.log(addTypeExpense);
    // res.status(200).json(addTypeExpense);

    const allMixedData = [...addTypeIncome, ...addTypeExpense];
    // console.log("all mixed data are: ", allMixedData);
    const mixedSortedData = allMixedData.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    // const mixedDataJson = allMixedData.toObject();
    // console.log("mixed json are: ", mixedDataJson);
    // res.status(200).json(mixedDataJson);
    // console.log("sorted data are: ", mixedSortedData);
    // res.status(200).json(mixedSortedData);
    const firstFiveData = mixedSortedData.slice(0, 4);
    // console.log("first five data are: ", firstFiveData);
    res.status(200).json(firstFiveData);

    //THIS WORKS AS WELL FOR SUBSTITUTE OF lean() METHOD IN ABOVE BUT NOT EFFICIENT
    // ALSO REMEMBER TO EXPLICTLY return MODIFIED DATA IF IT IS MODIFIED WHEN MODIFYING INSIDE CURLY BRACES
    // const addTypeExpense = recentExpense.map((data) => {
    //   const dataToObject = data.toObject();
    //   console.log("data to object: ", dataToObject);
    //   return {
    //     ...dataToObject,
    //     type: "expense",
    //   };
    // });
    // console.log("type added expense: ", addTypeExpense);
    // res.status(200).json(addTypeExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTotalIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const findIncome = await Income.aggregate([
      {
        $match: {
          userId: userId,
          date: { $gte: firstDay, $lte: lastDay },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);
    // console.log("all income of this month", findIncome[0]?.total || 0);
    totalInc = findIncome[0]?.total || 0;
    res.status(200).json(totalInc);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getTotalExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const totalExpense = await Expense.aggregate([
      {
        $match: {
          userId: userId,
          date: { $gte: firstDay, $lte: lastDay },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);
    totalExp = totalExpense[0]?.total || 0;
    res.status(200).json(totalExp);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getSavings = async (req, res) => {
  const userId = req.user.id;
  try {
    const findLstIncome = await Income.aggregate([
      {
        $match: {
          userId: userId,
          date: { $gte: lstMonthFstDay, $lte: lstMonthLstDay },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const findLstExpense = await Expense.aggregate([
      {
        $match: {
          userId: userId,
          date: { $gte: lstMonthFstDay, $lte: lstMonthLstDay },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const calLstIncome = findLstIncome[0]?.total || 0;
    const calLstExpense = findLstExpense[0]?.total || 0;

    const savingAmount = calLstIncome - calLstExpense;
    res.status(200).json(savingAmount);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getLastFourMonths = async (req, res) => {
  const userId = req.user.id;
  try {
    const lastFourIncome = await Income.aggregate([
      {
        $match: {
          userId: userId,
          date: { $gte: fourthMonthFstDay, $lte: lstMonthLstDay },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: {
          " _id.year": -1,
          "_id.month": -1,
        },
      },
    ]);

    // console.log("last four income: ", lastFourIncome);
    // const arrangedIncome = lastFourIncome.map((item) => item.totalAmount);
    // console.log("total data of income", arrangedIncome);

    const arrangedIncome = lastFourIncome.map((item) => ({
      month: item._id.month,
      amount: item.totalAmount,
    }));
    // console.log("total data of income", arrangedIncome);

    const lastFourExpense = await Expense.aggregate([
      {
        $match: {
          userId: userId,
          date: { $gte: fourthMonthFstDay, $lte: lstMonthLstDay },
        },
      },

      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: {
          "_id.year": -1,
          "_id.month": -1,
        },
      },
    ]);

    // console.log("last four expense", lastFourExpense);
    const arrangedExpense = lastFourExpense.map((item) => ({
      month: item._id.month,
      amount: item.totalAmount,
    }));
    // console.log("total data of expense", arrangedExpense);
    // res.status(200).json(arrangedExpense);

    const mergedArray = [arrangedIncome, arrangedExpense];
    // console.log("merged array are: ", mergedArray);
    res.status(200).json(mergedArray);

    // const mergedArray = [arrangedExpense, arrangedIncome];
    // console.log("merged array is: ", mergedArray);
    // res.status(200).json(mergedArray);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
