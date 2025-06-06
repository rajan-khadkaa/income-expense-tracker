import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import { SidebarLeftIcon } from "hugeicons-react";

function PrivateRoute({ children }) {
  const token = Cookies.get("token");
  const [expanded, setExpanded] = useState(false);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="h-screen relative flex box-border m-0 w-full">
      <div
        className={`dashboard-container z-10 m-1 md:m-4 lg:m-4 p-2 md:p-2 lg:p-4  flex flex-col justify-start align-middle ${
          expanded ? "translate-x-0" : "-translate-x-[105%]"
        } md:translate-x-0 transition-all duration-300 w-[60%]  md:w-52 lg:w-56`}
      >
        <Sidebar />
      </div>
      <div
        onClick={() => setExpanded(!expanded)}
        className={`absolute top-0 ${
          expanded
            ? "left-[60%] mt-5 text-[#4c20aa] -translate-x-[120%]"
            : "left-1 text-[#4c20aa] bg-[#4c20aa]/10 mt-5"
        }  transition-all p-2 rounded-tr-xl rounded-br-xl duration-300 z-20 md:hidden`}
      >
        <SidebarLeftIcon size={22} />
      </div>
      <div
        onClick={() => setExpanded(false)}
        className="absolute left-0 top-0 pl-0 md:pl-56 lg:pl-60 w-full h-full"
      >
        <div className="w-full h-full md:p-4 lg:p-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default PrivateRoute;

{
  /* <div className="flex flex-wrap border-2 h-screen  border-blue-500 w-full">
      <div className="dashboard-container h-[93vh] fixed w-[80px] md:w-[208px] lg:w-[224px] border-r border-gray-300">
        <Sidebar />
      </div>
      <div className="flex-grow h-[93vh] min-w-0 ml-[80px] md:ml-[208px] lg:ml-[224px] border-2 border-red-300">
        {children}
      </div>
    </div> */
}
