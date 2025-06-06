import React from "react";
import { useState, useEffect } from "react";
import "./Dashboard.css";
import Cookies from "js-cookie";
import axios from "axios";
import {
  AnalyticsDownIcon,
  AnalyticsUpIcon,
  Invoice01Icon,
  InvoiceIcon,
  TransactionIcon,
  MoneySavingJarIcon,
} from "hugeicons-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function Dashboard() {
  const [income, setIncome] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [lastMonthSaving, setLastMonthSaving] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState(0);
  const [lastFourMonthIncome, setLastFourMonthIncome] = useState(0);
  const [lastFourMonthExpense, setLastFourMonthExpense] = useState(0);
  const [monthsName, setMonthsName] = useState(0);
  const token = Cookies.get("token");

  useEffect(() => {
    getData();
    getTotalIncome();
    getTotalExpense();
    getLastMonthSaving();
    getRecentTransactions();
    getLastFourMonthTransaction();
  }, []);

  const getData = async () => {
    await axios
      .get(`${import.meta.env.VITE_BACKEND_API}/api/income`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((inc) => {
        // console.log("data from income page: ", inc);
        // console.log("received date is: ", inc.data[0].date);
        const incomeData = inc.data;
        const sortedIncome = incomeData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setIncome(sortedIncome);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };

  async function getTotalIncome() {
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/api/dashboard/totalIncome`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log(res.data);
        setTotalIncome(res.data);
      })
      .catch((error) => console.log(error));
  }
  async function getTotalExpense() {
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/api/dashboard/totalExpense`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log(res.data);
        setTotalExpense(res.data);
      })
      .catch((error) => console.log(error));
  }
  async function getLastMonthSaving() {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_API}/api/dashboard/lastMonthSaving`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        // console.log(res.data);
        setLastMonthSaving(res.data);
      })
      .catch((error) => console.log(error));
  }
  async function getRecentTransactions() {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_API}/api/dashboard/recentTransactions`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        // console.log("recent first four tansactions are: ", res.data);
        setRecentTransactions(res.data);
      })
      .catch((error) => console.log(error));
  }

  async function getLastFourMonthTransaction() {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_API
        }/api/dashboard/lastFourMonthTransaction`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setLastFourMonthIncome(res.data[0]);
        setLastFourMonthExpense(res.data[1]);
        // console.log("last four months income data: ", res.data[0]);
        // console.log("last four month expense data: ", res.data[1]);
        const incomeForMonths = res.data[0];
        const incomeMthName = incomeForMonths.map((item) => {
          const month = item.month;
          const date = new Date(0, month - 1);
          return date.toLocaleDateString("default", { month: "short" });
        });
        setMonthsName(incomeMthName);
        // console.log(
        //   "months name modified and reversed: ",
        //   incomeMthName.reverse()
        // );
      })
      .catch((error) => console.log(error));
  }

  const handleDateDisplay = (date) => {
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date();
    yesterday.setDate(new Date().getDate() - 1);
    // console.log("today is: ", today);
    // console.log("yesterday is: ", yesterday.toISOString().split("T")[0]);

    const receivedDate = date.split("T")[0];
    // console.log("received date is: ", receivedDate);

    if (receivedDate === today) return "Today";
    if (receivedDate === yesterday.toISOString().split("T")[0])
      return "Yesterday";
    return receivedDate;
  };

  return (
    <div className="content-container md:mt-0 flex flex-1 flex-col gap-3 p-3 sm:p-6 overflow-y-auto md:overflow-hidden">
      <h4 className="text-sm border-2 font-primaryMedium text-gray-600 ml-10 mt-2 md:ml-1 mb-1">
        Welcome back!
      </h4>
      <div className=" grid grid-cols-2 lg:grid-cols-4 w-full  gap-2">
        <div className="flex flex-1 p-3 rounded-md gap-4 bg-white shadow-md shadow-gray-100">
          <span className="bg-green-100 text-green-600 p-3 rounded-full h-fit">
            <AnalyticsUpIcon size={20} />
          </span>
          <div className="flex flex-col justify-start">
            <p className="font-primaryBold text-lg text-green-600">
              +Rs {totalIncome}
            </p>
            <p className="font-primaryMedium text-xs text-gray-400 m-0 ml-3">
              Income
            </p>
          </div>
        </div>
        <div className="flex flex-1 p-3 rounded-md gap-4 bg-white shadow-md shadow-gray-100">
          <span className="bg-red-100 text-red-600 p-3 rounded-full h-fit">
            <AnalyticsDownIcon size={20} />
          </span>
          <div className="flex flex-col justify-start">
            <p className="font-primaryBold text-lg text-red-600">
              -Rs {totalExpense}
            </p>
            <p className="font-primaryMedium text-xs text-gray-400 m-0 ml-2">
              Expense
            </p>
          </div>
        </div>
        <div className="flex flex-1 p-3 rounded-md gap-4 bg-white shadow-md shadow-gray-100 min-h-fit">
          <span className="bg-gray-100 text-gray-600 p-3 rounded-full h-fit">
            <InvoiceIcon size={20} />
          </span>
          <div className="flex flex-col justify-start">
            <p className="font-primaryBold text-lg text-gray-600">
              Rs {totalIncome - totalExpense}
            </p>
            <p className="font-primaryMedium text-xs text-gray-400 m-0 ml-1">
              Net Balance
            </p>
          </div>
        </div>
        <div className="flex flex-1 p-3 rounded-md gap-4 bg-white shadow-md shadow-gray-100">
          <span className="bg-gray-100 text-gray-600 p-3 rounded-full h-fit">
            <MoneySavingJarIcon size={20} />
          </span>
          <div className="flex flex-col justify-start">
            <p className="font-primaryBold text-lg text-gray-600">
              Rs {lastMonthSaving}
            </p>
            <p className="font-primaryMedium text-xs text-gray-400 m-0 ml-1">
              Past Savings
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-wrap gap-2 box-border flex-col lg:flex-row mt-2 lg:mt-4 lg:gap-4">
        <div className="flex flex-col gap-2 flex-1 rounded-md md:w-full lg:w-[50%] ">
          <div className="flex justify-start ml-1 mb-1 gap-1 text-gray-600">
            <Invoice01Icon className="mt-[2px]" size={16} />
            <h4 className="font-primaryMedium text-sm">Financial Overview</h4>
          </div>
          {monthsName.length > 0 ? (
            <div className=" bg-white w-full rounded-md px-4 py-[24px] drop-shadow-sm">
              <div className="mb-4 flex justify-end pr-5">
                <div className="flex gap-4">
                  <div className="flex align-middle justify-start gap-1">
                    <div className="bg-green-300 w-8 h-4 p-0 m-0 rounded-sm"></div>
                    <p className="m-o p-0 text-xs text-green-600">Income</p>
                  </div>
                  <div className="flex align-middle justify-start gap-1">
                    <div className="bg-red-300 w-8 h-4 p-0 m-0 rounded-sm"></div>
                    <p className="m-o p-0 text-xs text-red-600">Expense</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-1 ">
                {lastFourMonthIncome ? (
                  <Line
                    className="w-full"
                    data={{
                      // labels: lastFourMonthIncome.map((item) => item.month),
                      labels: monthsName.reverse(),
                      datasets: [
                        {
                          label: "Expense",
                          data: lastFourMonthExpense
                            .map((item) => item.amount)
                            .reverse(),
                          fill: true, // area fill
                          backgroundColor: "rgba(350, 73, 44, 0.4)", // Light red for expense
                          borderColor: "rgba(239, 68, 68, 0.6)", // Dark red border
                          tension: 0.4,
                        },
                        {
                          label: "Income",
                          data: lastFourMonthIncome
                            .map((item) => item.amount)
                            .reverse(),
                          fill: true, // area fill
                          backgroundColor: "rgba(34, 197, 94, 0.2)", // Light green for income
                          borderColor: "rgba(34, 197, 94, 0.6)", // Dark green border
                          tension: 0.4,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      // maintainAspectRatio: false,
                      scales: {
                        x: {
                          title: {
                            display: false,
                            text: "Months",
                          },
                          grid: {
                            display: false, // Show grid lines
                            color: "rgba(200, 200, 200, 0.5)", // Set grid line color and opacity
                          },
                        },
                        y: {
                          title: {
                            display: false,
                            text: "Amount",
                          },
                          grid: {
                            display: false, // Show grid lines
                            color: "rgba(200, 200, 200, 0.5)",
                          },
                        },
                      },
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    }}
                  />
                ) : (
                  <div className="flex justify-center">
                    <p>Loading...</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex mt-4">
              <p className=" ml-4 text-sm text-gray-600">
                Add records to see overview.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 flex-1 rounded-mdlg:w-[50%]">
          <div className="flex justify-start ml-1 mb-1 gap-1 text-gray-600">
            <TransactionIcon className="mt-[2px]" size={17} />
            <h4 className="font-primaryMedium text-sm">Recent Transactions</h4>
          </div>

          <ul className="flex flex-col p-1 gap-2 overflow-y-auto scroll-smooth">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((rec) => (
                <li key={rec._id}>
                  <div className="w-full drop-shadow-sm bg-white rounded-lg text-gray-600 h-fit px-4 py-3">
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <p className="text-gray-400 font-primaryRegular mb-[1px] text-xs">
                          {rec.title}
                        </p>
                        <h4
                          className={`${
                            rec.type === "income"
                              ? "text-green-600"
                              : "text-red-600"
                          } font-primaryBold text-lg`}
                        >
                          Rs. {rec.amount}
                        </h4>
                      </div>
                      <div className="flex flex-col justify-start gap-2">
                        <p className="text-gray-400 font-primaryRegular text-xs">
                          {handleDateDisplay(rec.date)}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p className="mt-3 ml-5 text-sm text-gray-600">
                No recent transactions.
              </p>
            )}
          </ul>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
