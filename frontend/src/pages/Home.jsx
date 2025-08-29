import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { dataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  let { serverUrl, userData, setUserData } = useContext(dataContext);
  console.log(userData);
  const navigate = useNavigate();

  if (!userData) {
    navigate("/");
  }

  const handleLogOut = async () => {
    try {
      await axios.post(
        serverUrl + "/api/v1/users/logout",
        {},
        { withCredentials: true }
      );
      setUserData(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-[#212121] flex justify-center items-center">
      <div className="space-y-2 text-center flex flex-col justify-center items-center">
        <div className="w-[100px] h-[100px] rounded-full bg-white overflow-hidden border-2 border-green-400">
          <img
            src={userData.profileImage}
            alt="upload image"
            className="w-full h-full"
          />
        </div>
        <p className="text-white text-xl">
          Hey{" "}
          <span className="text-green-400 font-semibold text-xl capitalize">
            {userData.firstName}
          </span>
          , welcome to my learning journey
        </p>
        <button
          className="bg-red-200 py-2 px-4 rounded-xl border-2 border-red-500 cursor-pointer hover:scale-105 duration-150"
          onClick={handleLogOut}
        >
          logout
        </button>
      </div>
    </div>
  );
}

export default Home;
