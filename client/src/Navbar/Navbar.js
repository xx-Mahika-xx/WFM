import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="text-black text-xl mt-3 flex justify-center">
      <Link
        to={"/home"}
        className="px-4 py-2 mx-2 rounded hover:bg-blue-600 hover:text-white transition duration-300"
      >
        Home
      </Link>
      <Link
        to={"/past"}
        className="px-4 py-2 mx-2 rounded hover:bg-blue-600 hover:text-white transition duration-300"
      >
        Past
      </Link>
      <Link
        to={"/about"}
        className="px-4 py-2 mx-2 rounded hover:bg-blue-600 hover:text-white transition duration-300"
      >
        About
      </Link>
    </div>
  );
};

export default Navbar;
