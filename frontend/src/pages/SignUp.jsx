import React, { useContext, useRef, useState } from "react";
import user from "../assets/user.jpg";
import { dataContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { serverUrl, userData, setUserData, getUserData } =
    useContext(dataContext);
  let navigate = useNavigate();

  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let file = useRef(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      let formdata = new FormData();

      formdata.append("firstName", firstName);
      formdata.append("lastName", lastName);
      formdata.append("userName", userName);
      formdata.append("email", email);
      formdata.append("password", password);

      if (backendImage) {
        formdata.append("profileImage", backendImage);
      }

      let res = await axios.post(serverUrl + "/api/v1/users/signup", formdata, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data);
      setUserData(res.data);
      await getUserData();
      navigate("/");
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  let [frontedImage, setFrontedImage] = useState(user);
  let [backendImage, setBackendImage] = useState(user);

  const handleProfilePicture = (e) => {
    let file = e.target.files[0];
    setBackendImage(file);

    let image = URL.createObjectURL(file);
    setFrontedImage(image);
  };

  return (
    <div className="w-full h-[100vh] bg-black flex justify-center items-center">
      <div className="w-[90%] max-w-[500px] h-[600px] bg-[#2c5052] rounded flex flex-col gap-5 justify-center items-center">
        <h1 className="text-white text-2xl font-semibold text-center">
          Sign Up
        </h1>
        <form
          action=""
          onSubmit={handleSignUp}
          className="w-full flex flex-col items-center justify-center gap-5"
        >
          <input
            type="file"
            name=""
            id=""
            hidden
            ref={file}
            onChange={handleProfilePicture}
          />
          <div className="w-[100px] h-[100px] rounded-full bg-white overflow-hidden relative hover:opacity-50">
            <img
              src={frontedImage}
              alt="upload image"
              className="w-full h-full"
            />
            <div
              className="absolute w-full h-full bg-black top-0 border-2 border-white rounded-full opacity-0 hover:opacity-50 cursor-pointer flex justify-center items-center text-white font-black text-6xl duration-300"
              onClick={() => {
                file.current.click();
              }}
            >
              +
            </div>
          </div>
          <div className="w-[80%] h-[50px] flex gap-3 justify-center items-center">
            <input
              type="text"
              name=""
              id=""
              placeholder="first name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              className="w-[50%] h-[50px] bg-white outline-none border-none rounded-lg px-3 py-1"
            />
            <input
              type="text"
              name=""
              id=""
              placeholder="last name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className="w-[50%] h-[50px] bg-white outline-none border-none rounded-lg px-3 py-1"
            />
          </div>
          <input
            type="text"
            name=""
            id=""
            placeholder="username"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            className="w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-3 py-1"
          />
          <input
            type="email"
            name=""
            id=""
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-3 py-1"
          />
          <input
            type="password"
            name=""
            id=""
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-3 py-1"
          />
          <button className="bg-[#007a9f] py-2 px-4 rounded-xl text-white font-semibold cursor-pointer hover:scale-105 duration-150 border-2 border-white">
            Sign Up
          </button>
          <p className="text-white">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
