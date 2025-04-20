import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-row">


        <div className=" flex flex-row justify-start w-1/2 p-5 text-2xl text-white ">Logo
        </div>

        <div className=" flex flex-row justify-around w-1/2 p-7 text-2xl text-white ">
        <Link to={"/"}>
          <button>Home</button>
        </Link>
        <Link to={"/Search"}>
          <button>Search</button>
        </Link>
        <Link to={"/Watch"}>
          <button>Watch</button>
        </Link>
        </div>

    </div>
  );
};

export default Navbar;
