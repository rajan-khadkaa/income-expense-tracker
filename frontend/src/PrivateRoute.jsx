import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";

function PrivateRoute({ children }) {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-wrap flex-1 w-full">
      <div className="dashboard-container h-[93vh] flex flex-col justify-start align-middle fixed w-20 md:w-52 lg:w-56">
        <Sidebar />
      </div>
      <div className="flex-1 h-full ml-[70px] md:ml-[200px] lg:ml-[245px]">
        {children}
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
