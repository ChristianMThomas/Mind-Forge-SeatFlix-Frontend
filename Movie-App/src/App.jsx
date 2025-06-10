import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Homepg from "./pages/Homepg";
import Searchpg from "./pages/Searchpg";
import Watchpg from "./pages/Watchpg";
import Login from "./pages/Login";
import Register from "./pages/Register";




const App = () => {
  return (

    

    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Homepg />} />
          <Route path="/Search" element={<Searchpg />} />
          <Route path="/Watch/:id" element={<Watchpg />} />
          


        </Route>
      </Routes>
    </Router>
  );
};

export default App;
