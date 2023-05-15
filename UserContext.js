import React, { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [UserData, setUserData] = useState({
    sessionToken: null,
    userID: null,
  });

  const [colour, setColour] = useState({
    green: "#5b1",
    darkGreen: "#4a2",
    lightGrey: "#777",
    black: "#fdfdfd",
    white: "#303134",
    lighterGrey: "#AAA",
    offWhite: "#202124",
    error: "#FF0000",
  });

  const [darkMode, setDarkMode] = useState(true);

  const updateColour = () => {
    if (darkMode) {
      setColour({
        green: "#5b1",
        darkGreen: "#4a2",
        lightGrey: "#777",
        black: "#000",
        white: "#FFF",
        lighterGrey: "#AAA",
        offWhite: "#FDFDFD",
      });
      setDarkMode(false);
    } else {
      setColour({
        green: "#5b1",
        darkGreen: "#4a2",
        lightGrey: "#777",
        black: "#fdfdfd",
        white: "#303134",
        lighterGrey: "#AAA",
        offWhite: "#202124",
      });
      setDarkMode(true);
    }
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
      value={{ UserData, updateData, colour, updateColour }}
    >
      {children}
    </UserContext.Provider>
  );
};
