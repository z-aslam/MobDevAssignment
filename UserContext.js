import React, { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateColour } from "./styles/colours";

export const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [UserData, setUserData] = useState({
    sessionToken: null,
    userID: null,
  });

  const [darkMode, setDarkMode] = useState(true);

  const updateDarkMode = () => {
    updateColour(!darkMode);
    setDarkMode(!darkMode);
  };

  const updateData = () => {
    AsyncStorage.getItem("sessionToken").then((sT) => {
      AsyncStorage.getItem("userID").then((uid) => {
        console.log(uid);
        setUserData({
          sessionToken: sT,
          userID: uid,
        });
        return new Promise((resolve, reject) => {
          resolve(UserData);
        });
      });
    });
  };

  return (
    <UserContext.Provider
      value={{ UserData, updateData, darkMode, updateDarkMode }}
    >
      {children}
    </UserContext.Provider>
  );
};
