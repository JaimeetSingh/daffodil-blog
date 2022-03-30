import "./singlePost.css";
import {useContext, useEffect, useState} from "react";
import {useLocation, Link} from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const path = useLocation().pathname.split("/")[2];
  const [post, setPost] = useState({});
  const {user} = useContext(Context);
  const PF = "https://daffodil-blog.herokuapp.com/images/";
  
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
 
  useEffect(()=>{
    const fetchPost = async() => {
        const res = await axiosInstance.get("/posts/" + path);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
    }
    fetchPost(); 
  }, [path]);
  const handleDelete = async() => {
    try{ 
        await axiosInstance.delete("/posts/" + path, {data:{
            username : user.username,
        }});
        window.location.replace("/");
    }
    catch(err){ }
  }
  const handleUpdate = async() =>{
    try{ 
        await axiosInstance.put("/posts/" + path,{
            username:user.username, title, desc
        });
        setUpdateMode(false);
    }
    catch(err){ }
  }
  return (
    <div className="singlePost">
        <div className="singlePostWrapper">
            {post.photo && (
                <img src={PF + post.photo} alt="" className="singlePostImg" />
                )
            }
            {
                updateMode ? <input type="text" value={title} className="singlePostTitleInput" autoFocus={true} onChange={(e)=>setTitle(e.target.value)}/> : (
                    <h1 className="singlePostTitle">
                    {title}
                    {(post.username === user?.username) && (
                    <div className="singlePostEdit">
                    <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>
                    <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                    </div>
                    )}
                    </h1>
                )
            }  

            <div className="singlePostInfo">
                <Link to={`/?user=${post.username}`} className="link">
                    <span className="singlePostAuthor">Author : <b>{post.username}</b></span>
                </Link>
                <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            {updateMode ? <textarea value={desc} className="singlePostDescInput" onChange={(e)=>setDesc(e.target.value)}/> : (
                <p className="singlePostDesc">
                    {desc}
                </p>
            )}
            {updateMode && (
                <button className="singlePostButton" onClick={handleUpdate}>Update</button>
            )}
            

            
        </div>
    </div>
  )
}