import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "../styles/globalStyle";
import { UserContext } from "../UserContext";

class Home extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
  }

  handleLogout = async () => {
    await AsyncStorage.removeItem("userID");
    await AsyncStorage.removeItem("sessionToken");
    this.context.updateData();
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: this.context.colour.offWhite },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            this.handleLogout();
          }}
        >
          <Text>LogOut</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Home;
