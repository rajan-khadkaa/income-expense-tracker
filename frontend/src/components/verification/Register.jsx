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

  function handleSubmit(event) {
    event.preventDefault();
    if (userInfo.name && userInfo.email && userInfo.password) {
      const registerUser = async (userInfo) => {
        await axios
          .post(
            `${import.meta.env.VITE_BACKEND_API}/api/user/register`,
            userInfo
          )
          .then((res) => {
            // console.log(res);
            navigate("/");
          })
          .catch((error) => console.log(error));
      };
      registerUser(userInfo);
    } else {
      alert("Please fill all the fields.");
    }
  }
  return (
    <div className="flex flex-wrap justify-center gap-8 items-center m-auto h-screen w-full lg:w-fit">
      <div className="flex flex-col lg:flex-1 lg:flex-row justify-center items-center  lg:items-start h-fit w-[90vw] sm:w-[80vw] lg:h-[68vh] lg:w-[55vw] gap-0 p-[3px] bg-gray-50 rounded-lg shadow-sm">
        <div className="hidden sm:block lg:flex-1 rounded-l-md sm:h-[300px] sm:w-full  lg:h-full bg-gray-200">
          <img
            className="object-contain w-full h-full"
            src={registerImage}
            alt="register image"
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
              It only takes a few seconds to register.
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
                  className="text-white bg-indigo-600 rounded-sm text-sm font-primaryMedium p-2 mt-2"
                  type="submit"
                >
                  Register
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
              <Link className="text-indigo-600 underline" to="/">
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
