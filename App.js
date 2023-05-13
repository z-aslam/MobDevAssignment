import * as React from "react";
import { UserProvider } from "./UserContext";
import Router from "./Router";
import { ToastProvider } from "react-native-toast-notifications";
import PropTypes from "prop-types";

const App = () => {
  return (
    <ToastProvider placement="top" duration={1500} offset={50}>
      <UserProvider>
        <Router />
      </UserProvider>
    </ToastProvider>
  );
};

App.propTypes = {
  children: PropTypes.node,
};

export default App;
