import React, { Component } from "react";
import { View } from "react-native";
import LoginForm from "../components/LoginForm";
import styles from "../styles/globalStyle";
import { colours } from "../styles/colours";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: colours.offWhite }]}>
        <LoginForm navigation={this.props.navigation} />
      </View>
    );
  }
}

export default Login;
