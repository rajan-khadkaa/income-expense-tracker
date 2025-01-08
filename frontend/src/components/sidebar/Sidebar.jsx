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
    <div className="sidebar-container flex flex-col flex-1  flex-wrap">
      <div className="flex justify-center align-middle mb-4 gap-2 p-2 w-full bg-indigo-100 md:bg-none rounded-md md:gap-3">
        <img
          src="./logo.svg"
          alt="Logo"
          className="w-36 h-auto border-2 md:w-8"
        />
        <img
          src="./name.svg"
          alt="Logo"
          className="w-0 invisible -ml-2 md:visible md:w-20"
        />
      </div>
      <div className="p-0 w-full flex flex-col flex-1 heightIssue justify-between">
        <ul className="sideBarDiv h-fit flex flex-col gap-2 font-primaryBold text-base">
          <Link
            to="/dashboard"
            onClick={() => setActiveSidebar("dashboard")}
            className={`${
              activeSidebar === "dashboard" ? "active" : ""
            } sidebarOptions sidebarMenu flex align-middle`}
          >
            <DashboardCircleIcon size={20} className="mt-[2.2px]" />
            <p className="invisible w-0 md:visible">Dashboard</p>
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
            <p className="invisible w-0 md:visible">Income</p>
          </Link>
          <Link
            to="/expense"
            onClick={() => setActiveSidebar("expense")}
            className={`${
              activeSidebar === "expense" ? "active" : ""
            } sidebarOptions sidebarMenu flex align-middle`}
          >
            <MoneySendSquareIcon size={20} className="mt-[2.2px] -ml-[1px]" />
            <p className="invisible w-0 md:visible">Expense</p>
          </Link>
          <Link
            to="/bin"
            onClick={() => setActiveSidebar("bin")}
            className={`${
              activeSidebar === "bin" ? "active" : ""
            } sidebarOptions sidebarMenu flex align-middle`}
          >
            <Delete03Icon size={20} className="mt-[2.2px]" />
            <p className="invisible w-0 md:visible">Bin</p>
          </Link>
        </ul>
        <div className="h-fit font-primaryRegular text-base">
          <hr />
          <button
            className="logoutBtn w-full flex justify-center text-white align-middle mt-4 py-[5.8px] rounded-md font-primaryMedium text-sm md:justify-between md:px-3"
            onClick={handleLogout}
          >
            <p className="invisible w-0 -ml-2 md:visible md:m-0">Logout</p>
            <LogoutSquare01Icon className="md:mt-[1.2px]" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
