import "./Sidebar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  DashboardCircleIcon,
  MoneyReceiveSquareIcon,
  MoneySendSquareIcon,
  LogoutSquare01Icon,
  Delete03Icon,
} from "hugeicons-react";

function Sidebar() {
  const [activeSidebar, setActiveSidebar] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const url = location.pathname;
    setActiveSidebar(url.slice(1));
    // console.log(url);
    // const sidebarOption = url.slice(1);
  }, []);

  const handleLogout = () => {
    const askUser = confirm("Are you sure you want to logout?");

    if (askUser) {
      Cookies.remove("token");
      navigate("/");
    }
  };

  return (
    <div className=" flex h-[100vh] flex-col">
      <div className="flex border-b-[1.5px] border-b-[#4c20aa]/10 items-center mb-4 gap-3 p-2 w-full md:bg-none md:gap-3">
        <img src="./logo.svg" alt="Logo" className="h-auto w-8" />
        <img src="./name.svg" alt="Logo" className="-ml-2 w-20" />
      </div>
      <div className="p-0 w-full flex flex-col items-start h-full justify-between">
        <ul className=" h-fit w-full flex flex-col gap-2 font-primaryBold text-base">
          <Link
            to="/dashboard"
            onClick={() => setActiveSidebar("dashboard")}
            className={`${
              activeSidebar === "dashboard" ? "active" : ""
            } sidebarOptions sidebarMenu flex align-middle`}
          >
            <DashboardCircleIcon size={20} className="mt-[2.2px]" />
            <p>Dashboard</p>
          </Link>
          <Link
            to="/income"
            onClick={() => setActiveSidebar("income")}
            className={`${
              activeSidebar === "income" ? "active" : ""
            } sidebarOptions sidebarMenu flex align-middle`}
          >
            <MoneyReceiveSquareIcon
              size={20}
              className="mt-[2.2px] -ml-[1px]"
            />
            <p>Income</p>
          </Link>
          <Link
            to="/expense"
            onClick={() => setActiveSidebar("expense")}
            className={`${
              activeSidebar === "expense" ? "active" : ""
            } sidebarOptions sidebarMenu flex align-middle`}
          >
            <MoneySendSquareIcon size={20} className="mt-[2.2px] -ml-[1px]" />
            <p>Expense</p>
          </Link>
          <Link
            to="/bin"
            onClick={() => setActiveSidebar("bin")}
            className={`${
              activeSidebar === "bin" ? "active" : ""
            } sidebarOptions sidebarMenu flex align-middle`}
          >
            <Delete03Icon size={20} className="mt-[2.2px]" />
            <p>Bin</p>
          </Link>
        </ul>
        <div className="h-fit w-full font-primaryRegular text-base">
          <hr />
          <button
            // className="border-red-200 border-[1.5px] text-red-500 hover:bg-red-800 hover:border-red-800 hover:text-white w-full flex align-middle mt-4 py-4 md:py-2 rounded-md font-primaryMedium text-sm justify-between px-3"
            className="bg-red-100 text-red-700 hover:bg-red-800 hover:text-white w-full flex align-middle mt-4 py-4 md:py-2 rounded-md font-primaryMedium text-sm justify-between px-4 md:px-3"
            onClick={handleLogout}
          >
            <p className="w-0 m-0">Logout</p>
            <LogoutSquare01Icon className="mt-[1.2px]" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
