import React, { useEffect, useRef, useState } from "react";
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
import { featureCards, threeStepsData } from "./data.js";

function Start() {
  const [gridItems, setGridItems] = useState([]);
  const navigate = useNavigate();
  const [height, setHeight] = useState("auto");
  const childRef = useRef(null);

  useEffect(() => {
    // Generate 170 grid cards when the component mounts
    setGridItems(new Array(140).fill(null));

    //get child height to set parent height
    if (childRef.current) {
      setHeight(`${childRef.current.offsetHeight}px`);
    }
  }, []);

  const iconMap = {
    clipboard: <ClipboardIcon />,
    activity: <Activity02Icon />,
    target: <Target02Icon />,
    shield: <ShieldEnergyIcon />,
  };

  return (
    <div className="w-full box-border m-0 bg-[#f1f1f1]">
      <div className="w-full px-4 md:px-16 lg:px-28 max-w-[1400px] flex flex-col items-center overflow-hidden">
        <nav className="w-full z-30 px-1 pr-1 pl-2 py-1  rounded-full flex justify-between items-center sticky top-2 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-2 border-white">
          <img className="h-6" src="./name-logo.svg" alt="spendly logo" />
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/register")}
              className="font-primaryMedium text-sm hover:text-violet-[#4a1ab2]"
            >
              Register
            </button>
            <button
              onClick={() => navigate("/login")}
              className="font-primaryMedium group flex gap-2 items-center relative text-sm px-6 py-2 bg-[#4a1ab2] hover:bg-[#7242db] transition-colors duration-300 text-white rounded-full"
            >
              <span className="mr-4 md:mr-6 lg:mr-5">Login</span>
              {/* <ArrowRight02Icon /> */}
              <CircleArrowUpRightIcon className="right-[6px] md:right-1 lg:right-2 absolute group-hover:rotate-45 transition-transform duration-300" />
            </button>
          </div>
        </nav>
        <div className="w-full relative h-fit flex  flex-col gap-16 items-center">
          <div className="absolute w-full">
            <div className=" gap-[0.7px] lg:gap-[1px] h-fit min-h-[36rem] md:min-h-[40rem] lg:min-h-[24rem] w-full grid grid-cols-[repeat(6,1fr)] grid-rows-[repeat(12,1fr)] md:grid-cols-[repeat(10,1fr)] md:grid-rows-[repeat(10,1fr)] lg:grid-cols-[repeat(15,1fr)] lg:grid-rows-[repeat(7,1fr)] box-border relative overflow-hidden m-0 p-0 bg-[#f1f1f1] -mt-10">
              <div className="animateCard w-full h-[300px]"></div>
              {gridItems.map((_, index) => (
                <div key={index} className="gridCards "></div>
              ))}
            </div>
          </div>
          <section
            className="w-full box-border mt-20 z-10"
            // style={{ height: height }}
          >
            {/* <div className="border-2 border-black"> */}
            <div
              // ref={childRef}
              className="flex flex-col lg:flex-row gap-9 md:gap-12 lg:gap-10  justify-between w-full items-center"
            >
              {/* <div className="absolute overflow-visible top-[55%] flex justify-center w-full items-center -translate-y-1/2 z-10"> */}
              <div className="w-full lg:w-1/2 flex flex-col">
                {/* <div className="w-[480px] flex flex-col items-center text-center"> */}
                <h1 className="text-4xl lg:text-5xl text-[#4a1ab2] font-primarySemiBold leading-tight">
                  Figure Out Where Your Money Goes
                </h1>
                <p className="text-gray-400 mt-5 text-base">
                  Stop guessing where your money goes. Spendly helps you log
                  transactions, see spending patterns, and stay in control of
                  your budget.
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="mt-8 font-primaryMedium group flex gap-2 items-center w-fit relative text-sm px-6 py-2 bg-[#4a1ab2] hover:bg-[#7242db] transition-colors duration-300 text-white rounded-full"
                >
                  <span className="mr-6 md:mr-6 lg:mr-5">Start Now</span>
                  <CircleArrowUpRightIcon className="right-[6px] md:right-1 lg:right-2 absolute group-hover:rotate-45 transition-transform duration-300" />
                </button>
              </div>
              <div className="w-full lg:w-1/2">
                <img
                  className="object-cover w-full h-full object-left"
                  src="./img.png"
                  alt="expense tracker image"
                />
              </div>
            </div>
            {/* </div> */}
          </section>
          <section className="mt-0 z-10 w-full flex justify-center">
            <div className="w-full flex flex-col items-center">
              <p className="text-sm text-center mb-4 md:mb-2 lg:mb-10 px-6 py-2 rounded-full w-fit bg-white font-primaryMedium text-gray-800">
                Features
              </p>
              <div className="flex flex-col lg:flex-row lg:justify-between gap-10 w-full leading-[1.4]">
                <div className="w-full px-4 lg:px-0 lg:w-[40%]">
                  <div className="p-4 bg-violet-200 text-violet-800 rounded-full size-fit">
                    <LaurelWreathFirst01Icon />
                  </div>
                  <h2 className="text-3xl mt-4 text-[#4a1ab2] font-primaryBold">
                    Smart tools to manage your money
                  </h2>
                  <p className="text-gray-400 mt-4">
                    Easily track your income and expenses with simple, powerful
                    features designed to give you control over your finances.
                  </p>
                </div>
                {/* <div className="flex flex-1 flex-wrap gap-4 border-2 border-yellow-500"> */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                  {featureCards.map((card) => (
                    <div
                      key={card.id}
                      className="rounded-lg bg-[#f9f9f9] border-2 border-white px-5 lg:px-4 pt-4 pb-5"
                    >
                      <div className="p-3 bg-violet-100 text-violet-800 rounded-full size-fit">
                        {iconMap[card.iconName]}{" "}
                        {/* This gives the exact icon from the dynamic value. eg. if the icon name is clipboard then it searches the 
                        key clipboard in the iconMap and then return it's value i.e. <ClipboardIcon/> */}
                      </div>
                      <h4 className="text-xl text-gray-800 font-primaryBold mt-6">
                        {card.title}
                      </h4>
                      <p className="text-gray-400 mt-1">{card.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="w-full flex justify-center">
            <div className="w-full flex flex-col items-center">
              <p className="text-sm text-center mb-7 px-6 py-2 rounded-full w-fit bg-white font-primaryMedium text-gray-800">
                How it works
              </p>
              <div className="flex flex-col gap-10 justify-between w-full">
                <div className=" w-full flex flex-col items-start">
                  <h2 className="text-3xl lg:max-w-[500px] text-[#4a1ab2] font-primaryBold">
                    {threeStepsData.header.title}
                  </h2>
                  <p className="text-gray-400 mt-4 md:max-w-[600px] lg:max-w-[500px]">
                    {threeStepsData.header.description}
                  </p>
                </div>

                <div className="flex flex-col lg:flex-row justify-between gap-10 items-center">
                  <div className="flex flex-col items-center gap-5 md:gap-7 lg:gap-6 w-full lg:w-[50%]">
                    {threeStepsData.steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="flex justify-center items-center rounded-full text-gray-800 font-primaryBold bg-[#f9f9f9] border-2 border-white">
                          <p className="size-9 flex justify-center items-center">
                            {index + 1}{" "}
                          </p>
                        </span>
                        <div className="mt-1">
                          <h4 className="text-xl text-gray-800 font-primaryBold">
                            {step.title}
                          </h4>
                          <p className="text-gray-400 mt-1">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="w-full lg:w-[50%]">
                    <video
                      autoPlay
                      loop
                      muted
                      className="size-full object-cover"
                      src={threeStepsData.video.src}
                      alt={threeStepsData.video.alt}
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
      </div>
      <footer className="w-full flex justify-center py-5 mt-10 bg-[#f9f9f9]">
        <div className="w-full px-4 md:px-16 lg:px-28 max-w-[1400px] flex justify-between">
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
