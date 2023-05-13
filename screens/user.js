import React, { Component } from "react";
import { View } from "react-native";
import styles from "../styles/globalStyle";
import UserPage from "../components/UserPage";
import { colours } from "../styles/colours";

class User extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: colours.offWhite }]}>
        <UserPage />
      </View>
    );
  }
}

export default User;
