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
                password, // DONT HASH HERE OR IT WILL DOUBLE HASH
            });

            console.log(response.status);

            if (response.status === 200 || response.status === 201) {
                localStorage.setItem("token", response.data.token); // Store JWT token if using JWT
                alert("Account created successfully!");
                navigate("/login"); // Redirect to login page after registration
            }
        } catch (error) {
            alert("Registration failed. Please try again.");
            console.error(error);
        }
    };

    return (
        <div>
             <h1 className="text-center text-amber-300 font-extrabold text-5xl mt-20">Ready to get started??</h1>

            
            
            <form onSubmit={handleRegister} className="bg-amber-300 w-full max-w-md mx-auto p-8 rounded-lg mt-10">
                 <img 
                src="signup.png"
                width={450}
                height={300}
                className="border-2 border-blue-950 rounded-2xl"
                />
                
                <h1 className="text-center text-blue-950  font-extrabold text-3xl mt-10">Register Now!</h1>
                <div className="flex flex-col p-2" >
                    
                <input className="border-1 my-3 rounded-lg text-lg  bg-white" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
                <input className="border-1 my-3 rounded-lg text-lg bg-white" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input className="border-1 my-3 rounded-lg text-lg bg-white" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <button className=" hover:bg-gray-500 bg-black text-white text-2xl  w-4/5 mx-auto my-3 rounded-lg " type="submit">Sign Up</button>
                </div>
                
            </form>
        </div>
    );
};

export default Register;