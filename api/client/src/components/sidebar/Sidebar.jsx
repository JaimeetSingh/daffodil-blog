import "./sidebar.css";
import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../config";

export default function Sidebar() {
    const [cats, setCats] = useState([]);

    useEffect(()=>{
        const getCats = async ()=> {
            const res = await axiosInstance.get("/categories")
            setCats(res.data);
        }
        getCats();
    }, [])

    return (
    <div className="sidebar">
        <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT ME</span>
            <img src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg" alt=""/>
            <p>
            “Many of life’s failures are people who did not realize how close they were to success when they gave up.”– Thomas A. Edison
            </p>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">CATEGORIES </span>
            <ul className="sidebarList">
                {cats.map((c, key)=>(
                    <Link to={`/?cat=${c.name}`} className="link" key={key}>
                        <li className="sidebarListItem" key={key}>{c.name}</li>
                    </Link>
                    )
                )}
            </ul>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW US</span> 
            <div className="sidebarSocial">
                <i className="sidebarIcon fa-brands fa-facebook-square"></i>
                <i className="sidebarIcon fa-brands fa-pinterest-square"></i>
                <i className="sidebarIcon fa-brands fa-twitter-square"></i>
                <i className="sidebarIcon fa-brands fa-instagram-square"></i>    
            </div>   
        </div>
    </div>
  )
}
