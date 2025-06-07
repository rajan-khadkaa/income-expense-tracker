import { useState, useEffect } from "react";
import "./Expense.css";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Delete03Icon,
  PencilEdit01Icon,
  SquareArrowDiagonal01Icon,
} from "hugeicons-react";

function Expense() {
  const [expense, setExpense] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const token = Cookies.get("token");
  const [editMode, setEditMode] = useState(false);
  const [expenseId, setExpenseId] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    getData();
    getTotalExpense();
  }, []);

  const getData = async () => {
    await axios
      .get(`${import.meta.env.VITE_BACKEND_API}/api/expense`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((exp) => {
        // console.log("data of expense: ", exp.data);
        const expenseData = exp.data;
        // console.log("expense data is: ", expenseData);
        const sortedExpense = expenseData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        // console.log("sorted expense data is: ", sortedExpense);
        setExpense(sortedExpense);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };

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

  const handleReset = (event) => {
    event.preventDefault();
    setFormData({
      title: "",
      desc: "",
      amount: "",
      date: "",
    });
    setEditMode(false);
  };

  //here the [name] means that it looks the assigned value of name instead of adding new property/key
  //if it was name: value then it would add name itself as new key instead. also called 'computed property name'
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    if (
      !formData.title ||
      !formData.amount ||
      !formData.date ||
      !formData.desc
    ) {
      alert("Please fill all fields.");
    } else {
      if (editMode) {
        await axios
          .put(
            `${import.meta.env.VITE_BACKEND_API}/api/expense/${expenseId}`,
            formData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then(() => alert("Expense record updated successfully."))
          .catch((error) => {
            console.log(error);
            alert(error.response.data.message);
          });
      } else {
        await axios
          .post(`${import.meta.env.VITE_BACKEND_API}/api/expense`, formData, {
            headers: { Authorization: `Bearer ${token}` },
          })
          // .then(() =>
          //   alert("Expense record added successfully."))
          // .then((res) => console.log("data inserted", res))
          .catch((error) => {
            console.log(error);
            alert(error.response.data.message);
          });
        alert("Expense record added successfully.");
      }

      setFormData({
        title: "",
        desc: "",
        amount: "",
        date: "",
      });
      setEditMode(false);
      setExpenseId(null);
    }
    getData();
    setLoading(false);
  };

  async function handleDelete(id) {
    const alertVal = confirm("Are you sure you want to delete record?");
    if (alertVal) {
      await axios
        .delete(`${import.meta.env.VITE_BACKEND_API}/api/expense/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => alert("Record deleted."))
        .catch((error) => {
          console.log(error);
          alert(error.response.data.message);
        });
    }
    getData();
  }

  function handleEdit(id) {
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/api/expense/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log("received specific expense data is: ", res.data);
        setFormData({
          title: res.data.title,
          desc: res.data.desc,
          amount: res.data.amount,
          date: res.data.date.split("T")[0],
        });
        setEditMode(true);
        setExpenseId(id);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  }

  function handleExpand(id) {
    if (expanded === id) {
      setExpanded("");
    } else {
      setExpanded(id);
    }
  }

  const handleDateDisplay = (date) => {
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date();
    yesterday.setDate(new Date().getDate() - 1);
    const receivedDate = date.split("T")[0];

    if (receivedDate === today) return "Today";
    if (receivedDate === yesterday.toISOString().split("T")[0])
      return "Yesterday";
    return receivedDate;
  };

  return (
    <div className="content-container p-3 sm:p-6 flex w-full  overflow-y-auto flex-col lg:flex-row">
      <div className=" flex flex-col gap-3 mb-0 h-fit flex-1 lg:w-[45%]">
        <h3 className="mb-4 font-primaryBold text-xl w-full text-center bg-red-50 text-red-700 py-4 rounded">
          Total Expense: Rs. {totalExpense}
        </h3>
        <hr className=" flex align-middle w-full" />
        <h4 className=" font-primaryMedium text-lg text-gray-500 text-center mb-1">
          Expense Form
        </h4>
        <form
          onSubmit={handleSubmit}
          className="expense-form-fields font-primaryRegular text-sm flex flex-col gap-4"
        >
          <select
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={` px-3 py-3 md:py-2 w-full rounded-md bg-white md:bg-gray-100 ${
              formData.title
                ? "text-neutral-800"
                : "text-gray-400 md:text-gray-400"
            }`}
          >
            <option value="" disabled>
              Chose title
            </option>
            <option value="Rent">Rent</option>
            <option value="Institutional">Institutional</option>
            <option value="Groceries">Groceries</option>
            <option value="Transportation">Transportation</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            placeholder="Enter the amount"
            onChange={handleChange}
            className={`px-3 py-3 md:py-2 rounded-md bg-white md:bg-gray-100 ${
              formData.amount
                ? "text-neutral-800"
                : "text-gray-300 md:text-gray-400"
            }`}
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            placeholder="Pick the date"
            onChange={handleChange}
            className={`px-3 py-3 md:py-2 w-full rounded-md bg-white md:bg-gray-100 ${
              formData.date
                ? "text-neutral-800"
                : "text-gray-300 md:text-gray-400"
            }`}
          />
          <textarea
            value={formData.desc}
            name="desc"
            placeholder="Enter description"
            onChange={handleChange}
            className={`px-3 py-3 md:py-2 rounded-md bg-white md:bg-gray-100 h-24 ${
              formData.desc
                ? "text-neutral-800"
                : "text-gray-300 md:text-gray-400"
            }`}
          ></textarea>
          <div className="flex flex-row w-full flex-wrap gap-3 font-primaryMedium text-sm">
            <button
              disabled={loading}
              type="submit"
              className={`${
                // loading ? "bg-gray-400" : "bg-[#602cd1] hover:bg-[#411999]"
                loading ? "bg-gray-400" : "bg-[#4a1ab2] hover:bg-[#7242db]"
              } text-white  w-full flex-1 py-4 md:py-[10px]  rounded-md`}
            >
              {loading ? "Adding..." : "Add Expense"}
            </button>
            {/* <button
              className="border-red-200 border-[1.5px] text-red-500 hover:bg-red-800 hover:border-red-800 hover:text-white   w-full flex-1 py-4 md:py-2   rounded-md"
              // className="border-red-200 border-[1.5px] text-red-500 hover:bg-red-800 hover:border-red-800 hover:text-white   w-full flex-1 py-4 md:py-2   rounded-md"
              // className="bg-red-100 text-red-700 hover:bg-red-200  w-full flex-1 py-4 md:py-2   rounded-md"
              onClick={handleReset}
            >
              Clear
            </button> */}
          </div>
        </form>
      </div>
      <hr className="my-6 lg:my-0 lg:mx-8 lg:border-[1px] lg:h-full" />
      <div className=" flex flex-col gap-2 flex-1 min-h-[500px] md:min-h-0 md:h-full overflow-hidden">
        <h3 className="mb-4 text-center font-primaryBold text-xl bg-gray-100 text-gray-600 py-4 rounded">
          Expense History
        </h3>
        <div className="px-1 w-full">
          <input
            value={search}
            className="px-3 w-full text-neutral-800 text-sm py-3 md:py-2 m-0 rounded-md placeholder:text-sm placeholder:text-gray-400"
            type="search"
            placeholder="Search here"
            onChange={(event) => setSearch(event.target.value.toLowerCase())}
          />
        </div>
        <ul className="flex flex-col p-1 gap-2 h-fit overflow-y-scroll scroll-smooth scrolling-auto">
          {expense.length > 0 ? (
            expense
              .filter((item) =>
                search === "" ? item : item.title.toLowerCase().includes(search)
              )
              .map((exp) => (
                <li key={exp._id}>
                  <div className="w-full drop-shadow-sm bg-white rounded-lg text-gray-600 h-fit px-4 py-3">
                    <div className="flex justify-between">
                      <div className="flex flex-col justify-start">
                        <p className=" text-gray-400 font-primaryRegular text-xs mb-1">
                          {exp.title}
                        </p>
                        <h4 className=" text-red-700 font-primaryBold text-lg">
                          Rs. {exp.amount}
                        </h4>
                      </div>
                      <div className="flex flex-col justify-start gap-2">
                        <p className=" text-gray-400 font-primaryRegular text-xs">
                          {handleDateDisplay(exp.date)}
                        </p>
                        <div className="flex gap-1">
                          <button
                            className="bg-gray-200 text-gray-600 px-1 py-1 rounded-md"
                            onClick={() => handleExpand(exp._id)}
                          >
                            {/* View */}
                            <SquareArrowDiagonal01Icon size={18} />
                          </button>
                          <button
                            className="bg-sky-100 text-sky-700 px-1 py-1 rounded-md"
                            onClick={() => handleEdit(exp._id)}
                          >
                            {/* Edit */}
                            <PencilEdit01Icon size={18} />
                          </button>
                          <button
                            className="bg-red-100 text-red-700 px-1 py-1 rounded-md"
                            onClick={() => handleDelete(exp._id)}
                          >
                            {/* Delete */}
                            <Delete03Icon size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`descInfo ${
                        expanded === exp._id ? "expanded" : ""
                      }`}
                    >
                      <hr className="m-auto my-3 flex align-middle w-full" />
                      <p className=" text-gray-400 font-primaryRegular text-sm">
                        {exp.desc}
                      </p>
                    </div>
                  </div>
                </li>
              ))
          ) : (
            <p className="text-center mt-3 text-sm text-gray-600">
              No expense records.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Expense;
