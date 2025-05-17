import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-row">


        <div className=" flex flex-row justify-start  align-middle w-1/3 p-5 text-2xl text-white ">
          <img className="rounded-3xl" src="Logo_App.jpg" alt="Logo image" />
        </div>

        <div className=" flex flex-row justify-around w-2/3 p-7 text-2xl text-white">
        <Link to={"/"}>
          <button className=" hover:text-amber-200  transition ease-in-out duration-200">Home</button>
        </Link>
        <Link to={"/Search"}>
          <button className=" hover:text-amber-200  transition ease-in-out duration-200">Search</button>
        </Link>
        

        </div>

    </div>
  );
};

export default Navbar;
