import './register.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { axiosInstance } from "../../config";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = async(e) => {
    e.preventDefault();
    setError(false);
    try{
      const res = await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");  
    }catch(err){
      setError(true);
      console.log(err);
    }

  }
  return (
    <div className="register">
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" className="registerInput" placeholder="Enter your username..."
            onChange = {e=>setUsername(e.target.value)}/>
            <label>Email</label>
            <input type="text" className="registerInput" placeholder="Enter your email..."
            onChange = {e=>setEmail(e.target.value)}/>
            <label>Password</label>
            <input type="password" className="registerInput" placeholder="Enter your password..."
            onChange = {e=>setPassword(e.target.value)}/>
            <button className="registerButton"  type="submit">
              Register
            </button>
            <Link to="/login" className="link">
              <button className="registerLoginButton">
                Login
              </button>
            </Link>
            {error && <span style={{color:"red", textAlign:"center", marginTop:"10px"}}>Something went wrong!</span>}
        </form>
    </div>
  )
}
