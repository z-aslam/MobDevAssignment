import React, { Component } from "react";
import { View } from "react-native";
import LoginForm from "../components/LoginForm";
import styles from "../styles/globalStyle";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <LoginForm navigation={this.props.navigation} />
      </View>
    );
  }
}

export default Login;
