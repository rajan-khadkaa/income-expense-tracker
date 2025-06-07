import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import registerImage from "../../assets/images/register.png";
const backendURL = import.meta.env.VITE_BACKEND_API;

function Register() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Updated handleChange to clear errors when typing
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    if (error) setError(null); // Clear error when user types
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null); // Clear any previous errors on new submission

    try {
      // Validate required fields
      if (!userInfo.name || !userInfo.email || !userInfo.password) {
        throw new Error("Please fill in all required fields.");
      }

      const res = await axios.post(`${backendURL}/api/user/register`, userInfo);

      // Positive check for success case first
      if (res.status === 200) {
        setError(null); // Clear error on successful registration
        navigate("/login");
        return;
      }

      // Handle all other cases as errors
      throw new Error(`Registration failed with status: ${res.status}`);
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center box-border m-0 p-0 h-screen w-full">
      <div className="flex w-[90%] sm:w-[65%] md:w-fit lg:w-[65%] flex-col lg:flex-row justify-center items-center lg:items-center md:gap-4 lg:gap-0 md:p-2 lg:py-1 lg:px-[3px] bg-gray-50 rounded-lg shadow-sm">
        <div className="hidden rounded-tl-[0.4rem] md:rounded-tr-[0.4rem] lg:rounded-tr-none lg:rounded-bl-[0.4rem] md:block md:w-[30rem] lg:w-[438px] bg-gray-200">
          <img
            className="object-contain w-full h-full lg:h-auto"
            src={registerImage}
            alt="register image"
          />
        </div>
        <div className="flex flex-1 flex-col justify-start w-full items-center p-5 sm:p-7 lg:p-7 gap-6 md:gap-10 bg-gray-50 rounded-r-md">
          <img
            className="w-[150px] h-auto"
            src="./name-logo.svg"
            alt="logo image"
          />

          <div className="w-full flex flex-col h-full justify-between gap-3">
            <h3 className="font-primaryRegular text-neutral-400 mb-2">
              It only takes a few seconds to sign up.
            </h3>
            <div className="w-full">
              <form
                className="flex flex-col gap-2 w-full"
                onSubmit={handleSubmit}
              >
                <input
                  className="px-3 py-3 md:py-[9px] rounded-sm text-sm bg-indigo-50"
                  type="text"
                  name="name"
                  value={userInfo.name}
                  placeholder="Enter your name"
                  onChange={handleChange}
                />
                <input
                  className="px-3 py-3 md:py-[9px] rounded-sm text-sm bg-indigo-50"
                  type="email"
                  name="email"
                  value={userInfo.email}
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
                <input
                  className="px-3 py-3 md:py-[9px] rounded-sm text-sm bg-indigo-50"
                  type="password"
                  name="password"
                  value={userInfo.password}
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
                {error && <p className="text-red-600 text-sm my-2">{error}</p>}
                <button
                  disabled={loading}
                  className={`${
                    loading ? "bg-gray-400" : "bg-[#4a1ab2] hover:bg-[#7242db]"
                  } text-white rounded-sm font-primaryMedium px-2 py-4 md:py-2 mt-2`}
                  type="submit"
                >
                  {loading ? "Signing up..." : "Sign up"}
                </button>
              </form>
            </div>
            <div className="w-full flex justify-center">
              <p className="font-primaryMedium text-gray-400 text-sm w-fit text-center">
                OR
              </p>
            </div>
            <p className="text-center text-neutral-600">
              Already have an account? Login{" "}
              <Link className="text-indigo-[#4a1ab2] underline" to="/login">
                here
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
