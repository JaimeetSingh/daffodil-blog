import './topbar.css';
import { Link} from "react-router-dom";
import { useContext } from 'react';
import { Context } from '../../context/Context';
import { Logout } from '../../context/Actions';

export default function TopBar(){
    const PF = "https://daffodil-blog.herokuapp.com/images/"; 
    const {user, dispatch} = useContext(Context); 
    const handleLogout = () => {
        dispatch(Logout());
    }
    return(
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fa-brands fa-facebook-square"></i>
                <i className="topIcon fa-brands fa-pinterest-square"></i>
                <i className="topIcon fa-brands fa-twitter-square"></i>
                <i className="topIcon fa-brands fa-instagram-square"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className='topListItem'>
                        <Link className="link" to="/">HOME</Link>
                    </li>
                    <li className='topListItem'>
                        <Link className="link" to="/">ABOUT</Link>
                    </li>   
                    <li className='topListItem'>
                        <Link className="link" to="/">CONTACTS</Link>
                    </li>
                    <li className='topListItem'>
                        <Link className="link" to="/write">WRITE</Link>
                    </li>
                    <li className='topListItem' onClick = {handleLogout}>
                        {user && "LOGOUT"}
                        {/* <Link className="link" >LOGOUT</Link> */}
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {   user ? (
                    <Link to="/settings">
                        <img className="topImg" src={user.profilePic ? (PF + user.profilePic) : (PF + "profile.png")} alt=""></img>
                    </Link>
                    ): (
                        <ul className="topList">
                            <li className="topListItem">
                                <Link className="link" to="/login">LOGIN</Link>
                            </li>
                            <li className="topListItem">
                                <Link className="link" to="/register">REGISTER</Link>
                            </li>
                        </ul>
                    )
                }
                <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    )
}


