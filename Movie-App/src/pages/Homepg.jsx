import React, { useEffect, useState } from "react";
import Search from "../components/Search";

const Homepg = () => {
    
    const[searchTerm, setSearchTerm ] = useState('');


   




  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
      <header>
        <div className="text-5xl text-white text-center  mt-25">
          Mind-Forge ||  Xplorer
        </div>
      </header>

      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="w-1/2 ml-auto mr-auto mt-50 text-white text-xl text-center">
        <p>
          Your Safety, Our Priority At Mind-Forge,  we are committed to
          providing a safe and trustworthy streaming experience. Your privacy
          is safeguarded with  and your data is
          handled responsibly in compliance with privacy laws. All content on
          our platform is protected to ensure a safe environment for all users.
          Stream with confidence, knowing your safety is our top priority. Let
          us at Mind-Forge know if you'd like Xplorer tweaked further! 
          Thank you - ©️Mind-Forge 2025
        </p>
      </div>
      </div>
    </main>
    
  );
};

export default Homepg;
