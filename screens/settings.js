import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "../styles/globalStyle";
import { UserContext } from "../UserContext";
import { colours } from "../styles/colours";

class Settings extends Component {
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
      <View style={[styles.container, { backgroundColor: colours.offWhite }]}>
        <Text> Settings </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.mainAppButton}
            onPress={() => {
              // update user information screen
            }}
          >
            <Text style={styles.buttonText} numberOfLines={1}>
              Update Information
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mainAppButton}
            onPress={() => {
              this.handleLogout();
            }}
          >
            <Text style={styles.buttonText} numberOfLines={1}>
              View Blocked Users
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mainAppButton}
            onPress={() => {
              this.handleLogout();
            }}
          >
            <Text style={styles.buttonText} numberOfLines={1}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Settings;
