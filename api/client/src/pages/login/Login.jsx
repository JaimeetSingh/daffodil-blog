import './login.css';
import { Link } from "react-router-dom";
import { useContext, useRef, useState } from 'react';
import { Context } from '../../context/Context';
import { LoginStart, LoginSuccess, LoginFailure } from '../../context/Actions';
import axios from 'axios';
import { axiosInstance } from '../../../config';

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch, isFetching} = useContext(Context);
  const [error, setError] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(LoginStart());
    try{
      const res = await axiosInstance.post("/auth/login", {
        username : userRef.current.value,
        password : passwordRef.current.value,
      });
      dispatch(LoginSuccess(res.data));
    }
    catch(err){
      setError(true);
      dispatch(LoginFailure());
    }
    // console.log(isFetching);
  };

  return (
    <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" className="loginInput" placeholder="Enter your username..." ref={userRef}/>
            <label>Password</label>
            <input type="password" className="loginInput" placeholder="Enter your password..." ref={passwordRef}/>
            <button className="loginButton" type="submit" disabled={isFetching}>
              Login
            </button>
            <Link className="link" to="/register">
              <button className="loginRegisterButton">
                Register
              </button>
            </Link>
            {error && <span style={{color:"red", textAlign:"center", marginTop:"10px"}}>Something went wrong!</span>}
        </form>
    </div>
  )
}
