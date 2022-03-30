import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"
import "./home.css"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom";
import axios from "axios"
import { axiosInstance } from "../../config";
 
export default function Home() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();
  useEffect(()=>{
    const fetchPosts = async ()=>{
    const res = await axiosInstance.get( "/posts" + search);
    setPosts(res.data);
    }
    fetchPosts();
  } ,[search]);


  return (
    <>
        <Header/>
        {
          posts.length===0 && (<p>NO POSTS FOUND</p>)
        }
        <div className="home">
            <Posts posts = {posts}/>
            <Sidebar/>
        </div>
    </>
  )
}
