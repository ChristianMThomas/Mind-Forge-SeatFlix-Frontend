import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Homepg from "./pages/Homepg";
import Searchpg from "./pages/Searchpg";
import Watchpg from "./pages/Watchpg";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";




const App = () => {
  return (

  
 <AuthProvider>
    <Router>
      <Routes>
        
        <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Homepg />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Search"
            element={
              <ProtectedRoute>
                <Searchpg />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Watch/:id"
            element={
              <ProtectedRoute>
                <Watchpg />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
