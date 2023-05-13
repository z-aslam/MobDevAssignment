import React, { Component } from "react";
import { View } from "react-native";

import SignUpForm from "../components/SignUpForm";
import styles from "../styles/globalStyle";

class SignUp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <SignUpForm navigation={this.props.navigation} />
      </View>
    );
  }
}

export default SignUp;
