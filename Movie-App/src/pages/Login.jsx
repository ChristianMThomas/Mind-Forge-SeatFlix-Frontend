import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { endpoints } from "../api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await axios.post(
        endpoints.login,
        { username, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Store JWT token if using JWT
        localStorage.setItem("userId", response.data.userId);
        console.log(response.data.userId);

        alert("Login successful!");
        login(); // update auth context
        navigate("/home");
      } else if (response.status === 401) {
        alert("Unauthorized HTTP Response!");
      } else if (response.status === 403) {
        alert("Forbidden!");
      }

      console.log(response.status);
    } catch (error) {
      alert("Invalid credentials. Please try again.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Welcome to SeatFlix</h1>
      <h1 className="text-center text-3xl">Lets get you logged in!</h1>
      <img
        src="LoginImage.png"
        width={250}
        height={250}
        className="m-auto mb-3"
      />
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md mx-auto p-8 rounded-lg shadow-md"
      >
        <div className="flex flex-col p-2 bg-light-200 rounded-2xl">
          <h1 className="text-center text-3xl text-black font-serif">
            Sign in
          </h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border-1 rounded-lg w-5/6 mx-auto mt-5 text-xl font-serif"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-1 rounded-lg w-5/6 mx-auto my-3 text-xl font-serif"
          />

          <div className="flex flex-row justify-between my-3">
            <h6 className="text-sm">
              <input type="checkbox" id="rememberMe" />
              <label for="rememberMe"> Remember me</label>
            </h6>
            <h6 className="text-sm hover:underline">
              {" "}
              <a href="#">Forgot Password?</a>
            </h6>
          </div>

          <button
            type="submit"
            className=" hover:bg-gray-500 bg-black text-white text-lg w-4/5 mx-auto my-3 rounded-lg "
          >
            Login
          </button>

          <h6 className="text-center text-sm">
            <a
              href="/register"
              className="font-light italic hover:text-amber-400"
            >
              First time here? Register today!
            </a>
          </h6>
        </div>
      </form>
    </div>
  );
};

export default Login;
