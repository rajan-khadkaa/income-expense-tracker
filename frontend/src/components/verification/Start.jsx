import React, { useEffect, useState } from "react";
import "./Start.css";
import { useNavigate } from "react-router-dom";
import {
  Activity02Icon,
  ArrowRight02Icon,
  CircleArrowMoveUpRightIcon,
  CircleArrowUpRightIcon,
  ClipboardIcon,
  LaurelWreathFirst01Icon,
  ShieldEnergyIcon,
  Target02Icon,
} from "hugeicons-react";
import TestimonialInfo from "./carousal-info";

function Start() {
  const [gridItems, setGridItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Generate 170 grid cards when the component mounts
    setGridItems(new Array(140).fill(null));
  }, []);
  return (
    <div className="w-full box-border m-0 p-0 bg-[#f1f1f1] flex flex-col items-center overflow-visible">
      <nav className="w-[1024px] z-30 px-1 pr-1 pl-2 py-1  rounded-full flex justify-between items-center sticky top-2 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-2 border-white">
        <img className="h-6" src="./name-logo.svg" alt="spendly logo" />
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/register")}
            className="font-primaryMedium text-sm hover:text-violet-800"
          >
            Register
          </button>
          <button
            onClick={() => navigate("/login")}
            className="font-primaryMedium group flex gap-2 items-center relative text-sm px-6 py-2 hover:bg-violet-600 transition-colors duration-300 bg-violet-800 text-white rounded-full"
          >
            <span className="mr-4">Login</span>
            {/* <ArrowRight02Icon /> */}
            <CircleArrowUpRightIcon className="right-1 absolute mr-1 group-hover:rotate-45 transition-transform duration-300" />
          </button>
        </div>
      </nav>
      <div className="w-full h-fit flex flex-col gap-4 items-center">
        <section className="w-full flex flex-col box-border items-center relative">
          <div className="container w-[1024px] -mt-10">
            <div className="animateCard"></div>
            {gridItems.map((_, index) => (
              <div key={index} className="gridCards"></div>
            ))}
            <div className="absolute overflow-visible top-[55%] flex justify-between w-full items-center -translate-y-1/2 z-10">
              {/* <div className="absolute overflow-visible top-[55%] flex justify-center w-full items-center -translate-y-1/2 z-10"> */}
              <div className="w-[480px] flex flex-col">
                {/* <div className="w-[480px] flex flex-col items-center text-center"> */}
                <h1 className=" text-5xl text-violet-800 font-primarySemiBold leading-tight">
                  Figure Out Where Your Money Goes
                </h1>
                <p className="text-gray-400 mt-5 text-base">
                  Stop guessing where your money goes. Spendly helps you log
                  transactions, see spending patterns, and stay in control of
                  your budget.
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="mt-8 font-primaryMedium group flex gap-2 items-center w-fit relative text-sm px-6 py-2 hover:bg-violet-600 transition-colors duration-300 bg-violet-800 text-white rounded-full"
                >
                  <span className="mr-4">Start Now</span>
                  <CircleArrowUpRightIcon className="right-1 absolute mr-1 group-hover:rotate-45 transition-transform duration-300" />
                </button>
              </div>
              <div className="h-[300px]">
                <img
                  className="object-cover w-full h-full object-left"
                  src="./img.png"
                  alt="expense tracker image"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="mt-0 w-full flex justify-center">
          <div className="w-[1024px] flex flex-col gap-10 items-center">
            <p className="text-sm text-center px-6 py-2 rounded-full w-fit bg-white font-primaryMedium text-gray-800">
              Features
            </p>
            <div className="flex justify-between w-full leading-[1.4]">
              <div className="max-w-[290px]">
                <div className="p-4 bg-violet-200 text-violet-800 rounded-full size-fit">
                  <LaurelWreathFirst01Icon />
                </div>
                <h2 className="text-3xl mt-4 text-gray-900 font-primaryBold">
                  Smart tools to manage your money
                </h2>
                <p className="text-gray-400 mt-4">
                  Easily track your income and expenses with simple, powerful
                  features designed to give you control over your finances.
                </p>
              </div>
              {/* <div className="flex flex-1 flex-wrap gap-4 border-2 border-yellow-500"> */}
              <div className="flex justify-end flex-wrap w-fit gap-4">
                <div className="min-w-[240px] max-w-[320px] rounded-lg bg-[#f9f9f9] border-2 border-white p-4">
                  <div className="p-3 bg-violet-100 text-violet-800 rounded-full size-fit">
                    <ClipboardIcon />
                  </div>
                  <h4 className="text-xl text-gray-800 font-primaryBold mt-6">
                    Track every transaction
                  </h4>
                  <p className="text-gray-400 mt-1">
                    Log your income and expenses with ease, keeping everything
                    organized in one place.
                  </p>
                </div>
                <div className="min-w-[240px] max-w-[320px]  rounded-lg bg-[#f9f9f9] border-2 border-white p-4">
                  <div className="p-3 bg-violet-100 text-violet-800 rounded-full size-fit">
                    <Activity02Icon />
                  </div>
                  <h4 className="text-xl text-gray-800 font-primaryBold mt-6">
                    See where money goes
                  </h4>
                  <p className="text-gray-400 mt-1">
                    Get a clear breakdown of your spending patterns making
                    better financial decisions.
                  </p>
                </div>
                <div className="min-w-[240px] max-w-[320px]  rounded-lg bg-[#f9f9f9] border-2 border-white p-4">
                  <div className="p-3 bg-violet-100 text-violet-800 rounded-full size-fit">
                    <Target02Icon />
                  </div>
                  <h4 className="text-xl text-gray-800 font-primaryBold mt-6">
                    Set monthly budgets
                  </h4>
                  <p className="text-gray-400 mt-1">
                    Spendly helps you track your progress and avoid overspending
                    so you can save more.
                  </p>
                </div>
                <div className="min-w-[240px] max-w-[320px]  rounded-lg bg-[#f9f9f9] border-2 border-white p-4">
                  <div className="p-3 bg-violet-100 text-violet-800 rounded-full size-fit">
                    <ShieldEnergyIcon />
                  </div>
                  <h4 className="text-xl text-gray-800 font-primaryBold mt-6">
                    Simple & Secure
                  </h4>
                  <p className="text-gray-400 mt-1">
                    Spendly is designed to keep your data safe, private, and
                    accessible anytime you want.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-16 w-full flex justify-center">
          <div className="w-[1024px] flex flex-col gap-8 items-center">
            <p className="text-sm text-center px-6 py-2 rounded-full w-fit bg-white font-primaryMedium text-gray-800">
              How it works
            </p>
            <div className="flex flex-col justify-between w-full">
              <div className="max-w-[640px]">
                {/* <div className="p-4 bg-violet-200 text-violet-800 rounded-full size-fit">
                  <LaurelWreathFirst01Icon />
                </div> */}
                <h2 className="text-3xl mt-4 text-gray-900 font-primaryBold">
                  Start tracking in three simple steps
                </h2>
                <p className="text-gray-400 mt-4">
                  Managing money shouldn’t be difficult. With Spendly, keeping
                  track of your income and expenses is as quick and easy as
                  1-2-3.
                </p>
              </div>
              <div className="flex gap-4 justify-between items-center mt-12">
                <div className="flex flex-col gap-3 max-w-[540px]">
                  <div className="flex items-start gap-3 mt-6">
                    <span className="w-10 h-10 flex justify-center items-center rounded-xl text-gray-800 font-primaryBold bg-[#f9f9f9] border-2 border-white">
                      <p>1</p>
                    </span>
                    <div>
                      <h4 className="text-xl text-gray-800 font-primaryBold">
                        Add your transactions
                      </h4>
                      <p className="text-gray-400 mt-1">
                        Record income and expenses in seconds. Simply enter the
                        amount, choose a category, and let Spendly handle the
                        rest.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 mt-6">
                    <span className="w-10 h-10 flex justify-center items-center rounded-xl text-gray-800 font-primaryBold bg-[#f9f9f9] border-2 border-white">
                      <p>2</p>
                    </span>
                    <div>
                      <h4 className="text-xl text-gray-800 font-primaryBold">
                        Deliver instant answers
                      </h4>
                      <p className="text-gray-400 mt-1">
                        Instantly see how much you ve earned, spent, and saved.
                        Visual breakdowns help you understand your financial
                        habits.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 mt-6">
                    <span className="w-10 h-10 flex justify-center items-center rounded-xl text-gray-800 font-primaryBold bg-[#f9f9f9] border-2 border-white">
                      <p>3</p>
                    </span>
                    <div>
                      <h4 className="text-xl text-gray-800 font-primaryBold">
                        Manage your team with reports
                      </h4>
                      <p className="text-gray-400 mt-1">
                        Whether you re saving for something big or just want to
                        cut down on unnecessary spending, Spendly keeps you on
                        track.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-[480px] h-[400px]">
                  <video
                    autoPlay
                    loop
                    muted
                    className="size-full object-cover"
                    src="https://cdn.dribbble.com/userupload/16145904/file/original-175c0e53b179263691d318368a3cc264.mp4"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="mt-6 w-full flex justify-center">
          <div className="w-[1024px] flex flex-col gap-14 items-center">
            <p className="text-sm text-center px-6 py-2 rounded-full w-fit bg-white font-primaryMedium text-gray-800">
              Testimonials
            </p>
            <div className="flex flex-col justify-between w-full">
              {console.log("the user info is: ", TestimonialInfo)}
            </div>
          </div>
        </section> */}
      </div>
      <footer className="w-full flex justify-center py-5 mt-10 bg-[#f9f9f9]">
        <div className="w-[1024px] flex justify-between">
          <img className="h-5" src="./name-logo.svg" alt="spendly logo" />
          <p className="text-sm text-gray-500">
            © 2025 Spendly. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Start;
