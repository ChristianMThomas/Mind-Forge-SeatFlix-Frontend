import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { endpoints } from "../api";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(endpoints.login, credentials, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        login();
        navigate("/home");
      } else if (response.status === 401){
        
        setError("Login failed. Please check your credentials.");
      }
      else{
        setError("Please try again. An error occured on our end.")
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
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
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
            className="border-1 rounded-lg w-5/6 mx-auto mt-5 text-xl font-serif"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
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

           {error && <p className="error-message">{error}</p>}

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
