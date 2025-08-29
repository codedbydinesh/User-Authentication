import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useContext } from "react";
import { dataContext } from "./context/UserContext";
import Loading from "./pages/Loading";

const App = () => {
  const { userData, loading } = useContext(dataContext);
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={loading ? <Loading /> : userData ? <Home /> : <Login />}
      />
    </Routes>
  );
};

export default App;
