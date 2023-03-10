import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import SetAvatar from "./pages/SetAvatar";

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/setAvatar" element={<SetAvatar/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/" element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  )
}