import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import registerImage from "../../assets/images/register.png";

function Register() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    if (userInfo.name && userInfo.email && userInfo.password) {
      const registerUser = async (userInfo) => {
        await axios
          .post(
            `${import.meta.env.VITE_BACKEND_API}/api/user/register`,
            userInfo
          )
          .then((res) => {
            // console.log(res);
            navigate("/login");
          })
          .catch((error) => console.log(error));
      };
      registerUser(userInfo);
      setLoading(false);
    } else {
      alert("Please fill all the fields.");
      setLoading(false);
    }
  }
  return (
    <div className="flex justify-center items-center box-border m-0 p-0 h-screen w-full">
      <div className="flex w-[90%] sm:w-[65%] md:w-fit lg:w-[65%] flex-col lg:flex-row justify-center items-center lg:items-start md:gap-4 lg:gap-0 p-[3px] bg-gray-50 rounded-lg shadow-sm">
        <div className="hidden rounded-tl-[0.4rem] md:rounded-tr-[0.4rem] lg:rounded-tr-none lg:rounded-bl-[0.4rem] md:block md:w-[30rem] lg:w-[420px] bg-gray-200">
          <img
            className="object-contain w-full h-full lg:h-auto"
            src={registerImage}
            alt="register image"
          />
        </div>
        <div className="flex flex-1 flex-col justify-start w-full items-center p-5 sm:p-7 lg:p-7 gap-10 bg-gray-50 rounded-r-md">
          <img
            className="w-[150px] h-auto"
            src="./name-logo.svg"
            alt="logo image"
          />

          <div className="w-full flex flex-col h-full justify-between gap-3">
            <h3 className="font-primaryRegular text-sm text-gray-400 mb-4">
              It only takes a few seconds to sign up.
            </h3>
            <div className="w-full">
              <form
                className="flex flex-col gap-2 w-full"
                onSubmit={handleSubmit}
              >
                <input
                  className="px-3 py-[9px] rounded-sm text-sm bg-indigo-50"
                  type="text"
                  value={userInfo.name}
                  placeholder="Enter your name"
                  onChange={(event) =>
                    setUserInfo({ ...userInfo, name: event.target.value })
                  }
                />
                <input
                  className="px-3 py-[9px] rounded-sm text-sm bg-indigo-50"
                  type="email"
                  value={userInfo.email}
                  placeholder="Enter your email"
                  onChange={(event) =>
                    setUserInfo({ ...userInfo, email: event.target.value })
                  }
                />
                <input
                  className="px-3 py-[9px] rounded-sm text-sm bg-indigo-50"
                  type="password"
                  value={userInfo.password}
                  placeholder="Enter your password"
                  onChange={(event) =>
                    setUserInfo({ ...userInfo, password: event.target.value })
                  }
                />
                <button
                  disabled={loading}
                  className={`${
                    loading ? "bg-gray-400" : "bg-indigo-600"
                  } text-white rounded-sm text-sm font-primaryMedium p-2 mt-2`}
                  type="submit"
                >
                  {loading ? "Signing up..." : "Sign up"}
                </button>
              </form>
            </div>
            <div className="w-full flex justify-center">
              <p className="font-primaryMedium text-gray-400 text-xs w-fit text-center">
                OR
              </p>
            </div>
            <p className="text-sm text-center">
              Already have an account? Login{" "}
              <Link className="text-indigo-600 underline" to="/login">
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
