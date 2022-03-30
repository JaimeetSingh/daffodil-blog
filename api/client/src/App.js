import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import TopBar from "./components/topbar/TopBar";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import React, { useContext } from "react";
import { Routes, Route, BrowserRouter} from "react-router-dom";
import { Context } from "./context/Context";

function App() {
  const {user} = useContext(Context);
  console.log(process.env.REACT_APP_BASE_URL);
  return (
    <BrowserRouter>
      <TopBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={user ? <Home/> : <Login/>} />
        <Route path="/register" element={user ? <Home/> : <Register/>} />
        <Route path="/settings" element={user ? <Settings/> : <Register/>} />
        <Route path="/write" element={user ? <Write/> : <Register/>} />
        <Route path="/post/:postId" element={user ? <Single/> : <Register/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
