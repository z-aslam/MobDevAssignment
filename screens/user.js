import React, { Component } from "react";
import { View } from "react-native";
import styles from "../styles/globalStyle";
import UserPage from "../components/UserPage";
import { UserContext } from "../UserContext";

class User extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: this.context.colour.offWhite },
        ]}
      >
        <UserPage />
      </View>
    );
  }
}

export default User;
