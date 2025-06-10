import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/v1/users/register", {
                username,
                email,
                password,
            });

            if (response.status === 201) {
                localStorage.setItem("token", response.data.token); // Store JWT token if using JWT
                alert("Account created successfully!");
                navigate("/home"); // Redirect to home page after registration
            }
        } catch (error) {
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div>
             <h1 className="text-center text-amber-300 font-extrabold text-3xl mt-20">Ready to get started??</h1>
            <h1 className="text-center text-2xl mt-20">Create your account here!</h1>
            <form onSubmit={handleRegister} className="bg-amber-300 w-full max-w-md mx-auto p-8 rounded-lg mt-10">
                <div className="flex flex-col p-2" >
                <input className="border-1 my-3 rounded-lg  bg-white" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
                <input className="border-1 my-3 rounded-lg  bg-white" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input className="border-1 my-3 rounded-lg  bg-white" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Sign Up</button>
                </div>
                
            </form>
        </div>
    );
};

export default Register;