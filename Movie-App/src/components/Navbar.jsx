import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";





const Navbar = () => {

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); // Reset authentication state
    navigate("/"); // Redirect back to login page
  };




  return (
    <div className="flex flex-row">


        <div className=" flex flex-row justify-start  align-middle w-1/3 p-5 text-2xl text-white ">
          <img className="rounded-3xl" src="Logo_App.jpg" alt="Logo image" />
        </div>

        <div className=" flex flex-row justify-around w-2/3 p-7 text-2xl text-white">
        <Link to={"/Home"}>
            <img width={50} height={50} src="Home.png" className="hover:cursor-pointer " title="Home"/>
        </Link>
        <Link to={"/Search"}>
            <img width={45} height={50} src="search.png" className="hover:cursor-pointer " title="Search Movies"/>
        </Link>

        <Link to={"/Profile"}>
          <img width={40} height={50} src="user.png" className="hover:cursor-pointer translate-y-1.5" title="View Profile"/>
        </Link>


          <button onClick={handleLogout} className="hover:cursor-pointer" title="Logout?">
            <img width={40} height={50} src="logout.png" className="-translate-y-1"/>
          </button>

        
        
        
        

        </div>

    </div>
  );
};

export default Navbar;
