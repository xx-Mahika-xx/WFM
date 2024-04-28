import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="text-white text-xl mt-3">
      <Link to={"/home"} className="pr-10 text-white">
        Home
      </Link>
      {/* <Link
        to={"/staffdashboard"}
        className="pr-10 text-color6 active:text-white"
      >
        Dashboard
      </Link> */}
      <Link to={"/home"} className="pr-10 text-color6 active:text-white">
        Past
      </Link>
      <Link to={"/home"} className="text-color6 active:text-white">
        About
      </Link>
    </div>
  );
}

export default Navbar