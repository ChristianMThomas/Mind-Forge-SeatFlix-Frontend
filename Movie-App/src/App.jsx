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
import Profile from "./pages/Profiles";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Layout />}>
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
            <Route
              path="/Profile"
              element={
                <ProtectedRoute>
                  <Profile />
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
