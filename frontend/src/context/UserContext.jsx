import React, { createContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export const dataContext = createContext();

function UserContext({ children }) {
  let [userData, setUserData] = useState(null);
  const serverUrl = "http://localhost:8000";
  let [loading, setLoading] = useState(true);

  const getUserData = async () => {
    try {
      const res = await axios.get(serverUrl + "/api/v1/users/getuserdata", {
        withCredentials: true,
      });
      setUserData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    serverUrl,
    userData,
    setUserData,
    getUserData,
    loading,
    setLoading,
  };

  useEffect(() => {
    getUserData();
  }, []);

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
}

export default UserContext;
