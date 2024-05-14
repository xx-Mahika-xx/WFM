import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HexagonalImage from "./HexagonalImage";
import './HomeContentSlider.css'
const HomeContentSlider = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 4000);
  }, [count])
    return (
        <span className="slider-container">
        <span className={'slider-slide ' + (count%2==1 ? '':'hidden-slide')}>
        <div className="flex flex-row items-center justify-evenly h-below-navbar">
          <div>
            <HexagonalImage imglink="female_doctor.jpg" />
          </div>
          <div className="text-center text-black">
            <h1 className="text-6xl font-semibold mt-6">Welcome to</h1>{" "}
            {/* Decreased margin top */}
            <h2 className="text-7xl font-semibold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              WFM
            </h2>
            <p className="text-xl text-color12 mt-5 max-w-md">
              A new LLM based application to optimize staff allocation in
              hospitals.
            </p>
            <div className="flex justify-center mt-8">
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-400 to-blue-600 px-8 py-4 rounded-full text-white font-semibold text-xl mr-4 transition duration-300 ease-in-out hover:from-blue-500 hover:to-blue-700"
              >
                Start Applying
              </Link>
              <Link
                to="#about"
                className="bg-white px-8 py-4 rounded-full text-blue-600 font-semibold text-xl transition duration-300 ease-in-out hover:bg-blue-100"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        </span>

        <span className={'slider-slide second-slide ' + (count%2==0 ? '':'hidden-slide')}>
        <div className="flex flex-row items-center justify-evenly h-below-navbar">
          <div>
            <HexagonalImage imglink="doctor_image.jpg" />
          </div>
          <div className="text-center text-black">
            <h1 className="text-6xl font-semibold mt-6">More about</h1>{" "}
            {/* Decreased margin top */}
            <h2 className="text-7xl font-semibold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              WFM
            </h2>
            <p className="text-xl text-color12 mt-5 max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, et dolore magna aliqua. 
            </p>
            <div className="flex justify-center mt-8">
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-400 to-blue-600 px-8 py-4 rounded-full text-white font-semibold text-xl mr-4 transition duration-300 ease-in-out hover:from-blue-500 hover:to-blue-700"
              >
                Start Applying
              </Link>
              <Link
                to="#about"
                className="bg-white px-8 py-4 rounded-full text-blue-600 font-semibold text-xl transition duration-300 ease-in-out hover:bg-blue-100"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        </span>
        </span>
    );
};

export default HomeContentSlider;