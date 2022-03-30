import './settings.css';
import Sidebar from '../../components/sidebar/Sidebar';
import { useContext,useState,useRef } from 'react';
import { Context } from "../../context/Context";
import {UpdateStart, UpdateSuccess, UpdateFailure, Logout} from "../../context/Actions";
import axios from "axios";
import { axiosInstance } from '../../../config';

export default function Settings() {
  const PF = "https://daffodil-blog.herokuapp.com/images/";
  const {user, dispatch} = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [success, setSuccess] = useState(false);
  const username_ref = useRef();
  const email_ref = useRef();
  const password_ref = useRef();
  const handleUpdate = async(e) => {
    e.preventDefault();
    dispatch(UpdateStart()); 
    const updatedUser = {
      userId : user._id,
      username,email,password,...user
    }
    if(file){
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try{
        await axiosInstance.post("/upload", data);
      }
      catch(err){ }
    }
    try{
      await axiosInstance.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch(UpdateSuccess(updatedUser));
      username_ref.current.value="";
      email_ref.current.value="";
      password_ref.current.value="";
    }
    catch(err){dispatch(UpdateFailure())};
  }

  const handleDelete = async()=> {
    await axiosInstance.delete("/users/" + user._id, {data : {
      userId : user._id,
    }});
    dispatch(Logout());

  }

  return (
    <div className="settings">
        <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete" onClick={handleDelete}>Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleUpdate}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            {file ? (<img src={URL.createObjectURL(file)} alt=""/>) : (
              user.profilePic && (
              <img src={PF + user.profilePic} alt="profile"/>)
            )}
            
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e)=>setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder={user.username} name="name" onChange={(e) => setUsername(e.target.value)} ref={username_ref}/>
          <label>Email</label>
          <input type="email" placeholder={user.email} name="email" onChange={(e) => setEmail(e.target.value)}  ref={email_ref}/>
          <label>Password</label>
          <input type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)}  ref={password_ref}/>
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {success && <span style={{color: "green", textAlign:"center", marginTop:"20px"}}>Profile has been updated!!</span>}
        </form>
      </div>
      <Sidebar />
    </div>
    
  )
}
