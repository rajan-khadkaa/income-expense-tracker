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
  const [error, setError] = useState(null);

  // Unified change handler that clears errors
  const handleChange = (e) => {
    setUserCred({ ...userCred, [e.target.name]: e.target.value });
    if (error) setError(null); // Clear error when user types
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null); // Clear previous errors on new submission

    try {
      if (!userCred.email || !userCred.password) {
        throw new Error("Please insert both email and password.");
      }

      const { email, password } = userCred;
      const res = await axios.post(`${backendURL}/api/user/login`, {
        email,
        password,
      });

      if (res.status !== 200) {
        throw new Error("Login failed with status: " + res.status);
      }

      const token = res.data.token;
      if (!token) {
        throw new Error("No authentication token received");
      }

      Cookies.set("token", token, { expires: 1 });
      setError(null); // Clear error on successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center box-border m-0 p-0 h-screen w-full">
      <div className="flex w-[90%] sm:w-[65%] md:w-[29rem] lg:w-[50rem] flex-col lg:flex-row justify-center items-center md:gap-4 lg:gap-0 lg:py-1 bg-gray-50 rounded-lg shadow-sm">
        <div className="hidden rounded-tl-[0.4rem] md:rounded-tr-[0.4rem] lg:rounded-tr-none lg:rounded-bl-[0.4rem] md:block md:w-[28rem] lg:w-[24rem] md:mt-2 lg:mt-0 lg:ml-1 bg-gray-200">
          <img
            className="object-contain w-full h-full lg:h-auto"
            src={loginImage}
            alt="login image"
          />
        </div>
        <div className="flex flex-1 flex-col justify-start lg:justify-center w-full items-center px-5 py-7 sm:px-7 sm:py-9 lg:p-6 gap-6 md:gap-10 bg-gray-50 rounded-lg">
          <img
            className="w-[150px] h-auto"
            src="./name-logo.svg"
            alt="logo image"
          />

          <div className="w-full flex flex-col h-full md:mb-2 lg:mb-0 justify-between gap-3">
            <h3 className="font-primaryRegular text-gray-400 mb-2">
              Welcome back. Please login to continue.
            </h3>

            <div className="w-full">
              <form
                className="flex flex-col gap-2 w-full"
                onSubmit={handleSubmit}
              >
                <input
                  className="px-3 py-3 md:py-[9px] rounded-sm text-sm bg-indigo-50"
                  type="email"
                  name="email"
                  value={userCred.email}
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
                <input
                  className="px-3 py-3 md:py-[9px] rounded-sm text-sm bg-indigo-50"
                  type="password"
                  name="password"
                  value={userCred.password}
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
                {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
                <button
                  disabled={loading}
                  className={`${
                    loading ? "bg-gray-400" : "bg-[#4a1ab2] hover:bg-[#7242db]"
                  } text-white rounded-sm font-primaryMedium px-2 py-4 md:py-2 mt-2`}
                  type="submit"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
            </div>
            <div className="w-full flex justify-center">
              <p className="font-primaryMedium text-gray-400 text-sm w-fit text-center">
                OR
              </p>
            </div>
            <p className="text-center">
              Don't have an account? Sign up{" "}
              <Link className="text-indigo-[#4a1ab2] underline" to="/register">
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
