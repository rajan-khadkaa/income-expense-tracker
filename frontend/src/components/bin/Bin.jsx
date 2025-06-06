import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {
  Delete03Icon,
  SquareArrowDiagonal01Icon,
  RestoreBinIcon,
} from "hugeicons-react";

function Bin() {
  const [binData, setBinData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [searchInc, setSearchInc] = useState("");
  const [searchExp, setSearchExp] = useState("");
  const token = Cookies.get("token");
  useEffect(() => {
    getBinData();
  }, []);

  const getBinData = async () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/api/bin`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setBinData(res.data);
        // console.log("data in bin is: ", res.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };

  const filteredIncome = binData.filter((data) => data.parent === "income");
  const filteredExpense = binData.filter((data) => data.parent === "expense");

  async function handleDelete(id) {
    const askConfirm = confirm(
      "Are you sure you want to delete permanently? It can't be undone."
    );
    if (askConfirm) {
      await axios
        .delete(`${import.meta.env.VITE_BACKEND_API}/api/bin/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => alert("Record permanently deleted from bin."))
        .catch((error) => {
          console.log(error);
          alert(error.response.data.message);
        });
      getBinData();
    }
  }

  async function handleRecover(id) {
    const askUser = confirm("Do you want to restore it?");
    if (askUser) {
      await axios
        .post(`${import.meta.env.VITE_BACKEND_API}/api/bin/${id}`, null, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // console.log("id being sent to backend: ", id);
          // console.log("token being sent to backend: ", token);
          // alert("Record recoverd successfully.");
          // console.log("message from backend: ", res.data.message);
        })
        .catch((error) => {
          console.log(error);
          alert(error.response.data.message);
        });
      getBinData();
    }
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
      <div className=" flex flex-col h-fit gap-1 lg:h-full lg:flex-1">
        <h3 className="font-primaryBold text-lg w-full text-center text-gray-600 py-4 rounded">
          Deleted Income Records
          {/* {console.log(binData[1].parent)} */}
        </h3>
        <div className="px-1 w-full">
          <input
            value={searchInc}
            className="px-3 w-full text-gray-600 text-sm py-2 m-0 rounded-md placeholder:text-xs placeholder:text-gray-400"
            type="search"
            placeholder="Search income here"
            onChange={(event) => setSearchInc(event.target.value.toLowerCase())}
          />
        </div>
        <ul className="flex flex-col p-1 gap-2 min-h-0 max-h-[300px] md:max-h-[400px]  lg:max-h-full overflow-y-auto scroll-smooth scrolling-auto">
          {filteredIncome.length > 0 ? (
            filteredIncome
              .filter((item) =>
                searchInc === ""
                  ? item
                  : item.title.toLowerCase().includes(searchInc)
              )
              .map((bin) => (
                <li key={bin._id}>
                  <div className="w-full drop-shadow-sm bg-white  rounded-lg text-gray-600 h-fit px-4 py-3">
                    <div className="flex justify-between">
                      <div className="flex flex-col justify-start">
                        <p className=" text-gray-400 font-primaryRegular text-xs mb-1">
                          {bin.title}
                        </p>
                        <h4 className=" text-gray-600 font-primaryBold text-xl">
                          Rs. {bin.amount}
                        </h4>
                      </div>
                      <div className="flex flex-col justify-start gap-2">
                        <p className=" text-gray-400 font-primaryRegular text-xs">
                          {handleDateDisplay(bin.date)}
                        </p>
                        <div className="flex gap-1">
                          <button
                            className="bg-sky-100 text-sky-700 px-1 py-1 rounded-md"
                            onClick={() => handleRecover(bin._id)}
                          >
                            {/* Restore */}
                            <RestoreBinIcon size={18} />
                          </button>
                          <button
                            className="bg-gray-200 text-gray-600 px-1 py-1 rounded-md"
                            onClick={() => handleExpand(bin._id)}
                          >
                            {/* Edit */}
                            <SquareArrowDiagonal01Icon size={18} />
                          </button>

                          <button
                            className="bg-red-100 text-red-700 px-1 py-1 rounded-md"
                            onClick={() => handleDelete(bin._id)}
                          >
                            {/* Delete */}
                            <Delete03Icon size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`descInfo ${
                        expanded === bin._id ? "expanded" : ""
                      }`}
                    >
                      <hr className="m-auto my-3 flex align-middle w-full" />
                      <p className=" text-gray-400 font-primaryRegular text-sm">
                        {bin.desc}
                      </p>
                    </div>
                  </div>
                </li>
              ))
          ) : (
            <p className="text-center mt-3 text-sm text-gray-600">
              No income records at the bin.
            </p>
          )}
        </ul>
      </div>
      <hr className="my-6 lg:my-0 lg:mx-8 lg:border-[1px] lg:h-full" />
      <div className=" flex flex-col gap-1 lg:h-full lg:flex-1">
        <h3 className="font-primaryBold text-lg w-full text-center text-gray-600 py-4 rounded">
          Deleted Expense Records
        </h3>
        <div className="px-1 w-full">
          <input
            value={searchExp}
            className="px-3 w-full text-gray-600 text-sm py-2 m-0 rounded-md placeholder:text-xs placeholder:text-gray-400"
            type="search"
            placeholder="Search expense here"
            onChange={(event) => setSearchExp(event.target.value.toLowerCase())}
          />
        </div>
        <ul className="flex flex-col p-1 gap-2 min-h-0 max-h-[300px] md:max-h-[400px] lg:max-h-full overflow-y-auto scroll-smooth scrolling-auto">
          {filteredExpense.length > 0 ? (
            filteredExpense
              .filter((item) =>
                searchExp === ""
                  ? item
                  : item.title.toLowerCase().includes(searchExp)
              )
              .map((bin) => (
                <li key={bin._id}>
                  <div className="w-full drop-shadow-sm bg-white  rounded-lg text-gray-600 h-fit px-4 py-3">
                    <div className="flex justify-between">
                      <div className="flex flex-col justify-start">
                        <p className=" text-gray-400 font-primaryRegular text-xs mb-1">
                          {bin.title}
                        </p>
                        <h4 className=" text-gray-600 font-primaryBold text-xl">
                          Rs. {bin.amount}
                        </h4>
                      </div>
                      <div className="flex flex-col justify-start gap-2">
                        <p className=" text-gray-400 font-primaryRegular text-xs">
                          {handleDateDisplay(bin.date)}
                        </p>
                        <div className="flex gap-1">
                          <button
                            className="bg-sky-100 text-sky-700 px-1 py-1 rounded-md"
                            onClick={() => handleRecover(bin._id)}
                          >
                            {/* Edit */}
                            <RestoreBinIcon size={18} />
                          </button>
                          <button
                            className="bg-gray-200 text-gray-600 px-1 py-1 rounded-md"
                            onClick={() => handleExpand(bin._id)}
                          >
                            {/* Edit */}
                            <SquareArrowDiagonal01Icon size={18} />
                          </button>
                          <button
                            className="bg-red-100 text-red-700 px-1 py-1 rounded-md"
                            onClick={() => handleDelete(bin._id)}
                          >
                            {/* Delete */}
                            <Delete03Icon size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`descInfo ${
                        expanded === bin._id ? "expanded" : ""
                      }`}
                    >
                      <hr className="m-auto my-3 flex align-middle w-full" />
                      <p className=" text-gray-400 font-primaryRegular text-sm">
                        {bin.desc}
                      </p>
                    </div>
                  </div>
                </li>
              ))
          ) : (
            <p className="text-center mt-3 text-sm text-gray-600">
              No expense records at the bin.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Bin;

{
  /* <div className="flex justify-between align-middle bg-gray-100 h-fit">
                    <div className="flex justify-start align-middle">
                      <div className="flex flex-col gap-1">
                        <p className=" text-gray-400 font-primaryRegular text-xs">
                          {bin.title}
                        </p>
                        <p className=" text-green-600 font-primaryBold text-xl">
                          {bin.amount}
                        </p>
                      </div>
                      <p>{bin.date.split("T")[0]}</p>
                    </div>
                    <button>Delete</button>
                    <button>Recover</button>
                  </div> */
}
