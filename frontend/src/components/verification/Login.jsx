import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import loginImage from "../../assets/images/login.png";
const backendURL = import.meta.env.VITE_BACKEND_API;

function Login() {
  const navigate = useNavigate();
  const [userCred, setUserCred] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    if (userCred.email && userCred.password) {
      const { email, password } = userCred;
      const checkUser = async (email, password) => {
        await axios
          .post(
            `${backendURL}${backendURL.endsWith("/") ? "" : ""}/api/user/login`,
            {
              email,
              password,
            }
          )
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
      setLoading(false);
    } else {
      alert("Please insert both email and password.");
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center box-border m-0 p-0  h-screen w-full">
      <div className="flex w-[90%] sm:w-[65%] md:w-[29rem] lg:w-[50rem] flex-col lg:flex-row justify-center items-center md:gap-4 lg:gap-0 bg-gray-50 rounded-lg shadow-sm">
        <div className="hidden rounded-tl-[0.4rem] md:rounded-tr-[0.4rem] lg:rounded-tr-none lg:rounded-bl-[0.4rem] md:block md:w-[28rem] lg:w-[23rem] md:mt-2 lg:mt-0 lg:ml-1 bg-gray-200">
          <img
            className="object-contain w-full h-full lg:h-auto"
            src={loginImage}
            alt="login image"
          />
        </div>
        <div className="flex flex-1 flex-col justify-start w-full items-center px-5 py-7 sm:px-7 sm:py-9 lg:p-7 gap-10 bg-gray-50 rounded-lg">
          <img
            className="w-[150px] h-auto"
            src="./name-logo.svg"
            alt="logo image"
          />

          <div className="w-full flex flex-col h-full md:mb-2 lg:mb-0 justify-between gap-3">
            <h3 className=" font-primaryRegular text-sm text-gray-400 mb-4">
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
                  disabled={loading}
                  className={`${
                    loading ? "bg-gray-400" : "bg-indigo-600"
                  } text-white  rounded-sm text-sm font-primaryMedium p-2 mt-2`}
                  type="submit"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
            </div>
            <div className="w-full flex justify-center">
              <p className="font-primaryMedium text-gray-400 text-xs w-fit text-center">
                OR
              </p>
            </div>
            <p className="text-sm text-center">
              Don't have an account? Sign up{" "}
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
