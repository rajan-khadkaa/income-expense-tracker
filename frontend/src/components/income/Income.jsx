import { useState, useEffect } from "react";
import "./Income.css";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Delete03Icon,
  PencilEdit01Icon,
  SquareArrowDiagonal01Icon,
} from "hugeicons-react";

function Income() {
  const [income, setIncome] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const token = Cookies.get("token");
  const [editMode, setEditMode] = useState(false);
  const [incomeId, setIncomeId] = useState(null);
  const [expanded, setExpanded] = useState("");
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
    getTotalIncome();
  }, []);

  const getData = async () => {
    await axios
      .get(`${import.meta.env.VITE_BACKEND_API}/api/income`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((inc) => {
        // console.log("data from income page without sort: ", inc.data);
        const incomeData = inc.data;
        const sortedIncome = incomeData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        // console.log("data from income page after sort: ", sortedIncome);
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
    event.preventDefault();
    setLoading(true);
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
            `${import.meta.env.VITE_BACKEND_API}/api/income/${incomeId}`,
            formData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .catch((error) => {
            console.log(error);
            alert(error.response.data.message);
          });
        alert("Income record updated successfully.");
      } else {
        // console.log("date before sending to backend: ", formData.date);
        const now = new Date();
        const formatDate = new Date(formData.date);
        formatDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
        const formattedData = { ...formData, date: formatDate.toISOString() };
        // console.log(
        //   "the formatted data before sending to backend: ",
        //   formattedData
        // );
        // const time = now.toTimeString().split("T")[0];
        // console.log("time is: ", time);
        // const formatDate = new Date(`${formData.date}T${time}Z`);
        // const formattedData = { ...formData, date: formatDate.toISOString() };
        // console.log("formatted all data including date is: ", formattedData);
        await axios
          .post(
            `${import.meta.env.VITE_BACKEND_API}/api/income`,
            formattedData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .catch((error) => {
            console.log(error);
            alert(error.response.data.message);
          });
        alert("Income record added successfully.");
      }

      setFormData({
        title: "",
        desc: "",
        amount: "",
        date: "",
      });
      setEditMode(false);
      setIncomeId(null);
    }
    setLoading(false);
    getData();
  };

  async function handleDelete(id) {
    const alertVal = confirm("Are you sure you want to delete record?");
    if (alertVal) {
      await axios
        .delete(`${import.meta.env.VITE_BACKEND_API}/api/income/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => alert("Record deleted."))
        .catch((error) => {
          console.log(error);
          alert(error.response.data.message);
        });
      // alert("Record deleted.");
    }

    getData();
  }

  function handleEdit(id) {
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/api/income/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log("received specific income data is: ", res.data);
        setFormData({
          title: res.data.title,
          desc: res.data.desc,
          amount: res.data.amount,
          date: res.data.date.split("T")[0],
        });
        setEditMode(true);
        setIncomeId(id);
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
        <h3 className="mb-4 font-primaryBold text-xl w-full text-center bg-green-50 text-green-600 py-4 rounded">
          Total Income: Rs. {totalIncome}
        </h3>
        <hr className=" flex align-middle w-full" />
        <h4 className=" font-primaryMedium text-lg text-gray-500 text-center mb-1">
          Income Form
        </h4>
        <form
          onSubmit={handleSubmit}
          className="income-form-fields font-primaryRegular text-sm flex flex-col gap-4"
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
            <option value="Salary">Salary</option>
            <option value="Business">Business</option>
            <option value="Rent">Rent</option>
            <option value="Freelancing">Freelancing</option>
            <option value="Allowance">Allowance</option>
            <option value="Other">Other</option>
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
                loading ? "bg-gray-400" : "bg-[#4a1ab2] hover:bg-[#7242db]"
                // loading ? "bg-gray-400" : "bg-green-700 hover:bg-green-800"
              } text-white  w-full flex-1 py-4 md:py-[10px]  rounded-md`}
            >
              {loading ? "Adding..." : "Add Income"}
            </button>
            {/* <button
              className="bg-red-100 text-red-700 hover:bg-red-200  w-full flex-1 py-4 md:py-2   rounded-md"
              onClick={handleReset}
            >
              Clear
            </button> */}
          </div>
        </form>
      </div>
      <hr className="my-6 lg:my-0 lg:mx-8 lg:border-[1px] lg:h-full" />
      <div className=" flex flex-col gap-2 flex-1 min-h-[500px] md:min-h-0 md:h-full overflow-hidden">
        <h3 className="mb-4 text-center font-primaryBold text-xl  bg-gray-100 text-gray-600 py-4 rounded">
          Income History
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
          {income.length > 0 ? (
            income
              .filter((item) =>
                search === "" ? item : item.title.toLowerCase().includes(search)
              )
              .map((inc) => (
                <li key={inc._id}>
                  <div className="w-full drop-shadow-sm bg-white  rounded-lg text-gray-600 h-fit px-4 py-3">
                    <div className="flex justify-between">
                      <div className="flex flex-col justify-start">
                        <p className=" text-gray-400 font-primaryRegular mb-1 text-xs">
                          {inc.title}
                        </p>
                        <h4 className=" text-green-600 font-primaryBold text-lg">
                          Rs. {inc.amount}
                        </h4>
                      </div>
                      <div className="flex flex-col justify-start gap-2">
                        <p className=" text-gray-400 font-primaryRegular text-xs">
                          {handleDateDisplay(inc.date)}
                        </p>
                        <div className="flex gap-1">
                          <button
                            className="bg-gray-200 text-gray-600 px-1 py-1 rounded-md"
                            onClick={() => handleExpand(inc._id)}
                          >
                            {/* View */}
                            <SquareArrowDiagonal01Icon size={18} />
                          </button>
                          <button
                            className="bg-sky-100 text-sky-700 px-1 py-1 rounded-md"
                            onClick={() => handleEdit(inc._id)}
                          >
                            {/* Edit */}
                            <PencilEdit01Icon size={18} />
                          </button>
                          <button
                            className="bg-red-100 text-red-700 px-1 py-1 rounded-md"
                            onClick={() => handleDelete(inc._id)}
                          >
                            {/* Delete */}
                            <Delete03Icon size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`descInfo ${
                        expanded === inc._id ? "expanded" : ""
                      }`}
                    >
                      <hr className="m-auto my-3 flex align-middle w-full" />
                      <p className=" text-gray-400 font-primaryRegular text-sm">
                        {inc.desc}
                      </p>
                    </div>
                  </div>
                </li>
              ))
          ) : (
            <p className="text-center mt-3 text-sm text-gray-600">
              No income records.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Income;
