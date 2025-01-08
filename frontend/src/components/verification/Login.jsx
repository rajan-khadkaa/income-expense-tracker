import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import loginImage from "../../assets/images/login.png";

function Login() {
  const navigate = useNavigate();
  const [userCred, setUserCred] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    if (userCred.email && userCred.password) {
      const { email, password } = userCred;
      const checkUser = async (email, password) => {
        await axios
          .post(`http://localhost:4000/api/user/login`, { email, password })
          .then((res) => {
            try {
              // const verifiedStatus = res.data.message;
              if (res.status === 200) {
                const token = res.data.token;
                Cookies.set("token", token, { expires: 1 });
                // console.log("successful login");
                navigate("/dashboard");
              }
              // alert(res.data.message);
            } catch (error) {
              console.log(error);
              // alert(error.message);
            }
          })
          .catch((error) => {
            console.log(error);
            alert(error.response.data.message);
          });
      };
      checkUser(email, password);
    } else {
      alert("Please insert both email and password.");
    }
  }

  return (
    <div className="flex flex-wrap justify-center gap-8 items-center m-auto h-screen w-full lg:w-fit">
      <div className="flex flex-col lg:flex-1 lg:flex-row justify-center items-center  lg:items-start h-fit w-[90vw] sm:w-[80vw] lg:h-[68vh] lg:w-[55vw] gap-0 p-[3px] bg-gray-50 rounded-lg shadow-sm">
        <div className="hidden sm:block lg:flex-1 rounded-l-md sm:h-[300px] sm:w-full  lg:h-full bg-gray-200">
          <img
            className="object-contain w-full h-full"
            src={loginImage}
            alt="login image"
          />
        </div>
        <div className="flex flex-1 flex-col justify-start h-full w-full items-center p-7 gap-10 bg-gray-50 rounded-r-md">
          <img
            className="w-[150px] h-auto"
            src="./name-logo.svg"
            alt="logo image"
          />

          <div className="w-full flex flex-col h-full  justify-between gap-2">
            <h3 className=" font-primaryRegular text-sm text-gray-400">
              Welcome back. Please login to continue.
            </h3>
            <div className="w-full">
              <form
                className="flex flex-col gap-2 w-full"
                onSubmit={handleSubmit}
              >
                <input
                  className="px-3 py-[9px] rounded-sm text-sm bg-indigo-50"
                  type="text"
                  value={userCred.email}
                  placeholder="Enter your email"
                  onChange={(event) =>
                    setUserCred({ ...userCred, email: event.target.value })
                  }
                />
                <input
                  className="px-3 py-[9px] rounded-sm text-sm bg-indigo-50"
                  type="password"
                  value={userCred.password}
                  placeholder="Enter your password"
                  onChange={(event) =>
                    setUserCred({ ...userCred, password: event.target.value })
                  }
                />
                <button
                  className="text-white bg-indigo-600 rounded-sm text-sm font-primaryMedium p-2 mt-2"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="w-full flex justify-center">
              <p className="font-primaryMedium text-gray-400 text-xs w-fit text-center">
                OR
              </p>
            </div>
            <p className="text-sm text-center">
              Don't have an account? Register{" "}
              <Link className="text-indigo-600 underline" to="/register">
                here
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
