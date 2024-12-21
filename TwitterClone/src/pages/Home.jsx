// import React from 'react'
import Sidebar from "./sidebar/Sidebar";
import Widget from "./widgets/Widget";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/useUserAuth";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  // const user = {
  //   displayname: "bithead",
  //   email: "bithead@gmail.com",
  // };
  const handlelogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="app">
      <Sidebar handlelogout={handlelogout} user={user} />
      <Outlet />
      <Widget />
    </div>
  );
};

export default Home;
