import React, { Component } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import styles from "../styles/globalStyle";
import BigLogo from "../components/BigLogo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../UserContext";

class LoginForm extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorText: "",
    };
  }

  loginHandler = () => {
    fetch("http://localhost:3333/api/1.0.0/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        } else if (response.status == 400) {
          this.setState({ errorText: "Incorrect Email or Password" });
        } else {
          this.setState({ errorText: "Server Error" });
        }
      })
      .then((data) => {
        AsyncStorage.setItem("sessionToken", data.token);
        AsyncStorage.setItem("userID", data.id);
        this.context.updateData();
      })
      .catch((err) => {
        console.log(err);
        // this.setState({errorText: err.statusText});
      });
  };

  render() {
    return (
      <View style={[styles.container]}>
        <BigLogo />

        <Text style={styles.secondaryTitleText}> Login </Text>

        <TextInput
          style={styles.inputView}
          onChangeText={(v) => this.setState({ email: v })}
          placeholder="Email..."
          placeholderTextColor="#808080"
        />

        <TextInput
          style={styles.inputView}
          onChangeText={(v) => this.setState({ password: v })}
          secureTextEntry={true}
          placeholder="Password..."
          placeholderTextColor="#808080"
        />

        <Text style={styles.errorStyle}>{this.state.errorText}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.inputButton}
            onPress={this.loginHandler}
          >
            <Text style={styles.buttonText} numberOfLines={1}>
              {" "}
              Login{" "}
            </Text>
          </TouchableOpacity>

          <Text style={styles.normalText}> or </Text>

          <TouchableOpacity
            style={styles.altInputButton}
            onPress={() => this.props.navigation.navigate("SignUp")}
          >
            <Text style={styles.buttonText} numberOfLines={1}>
              {" "}
              Sign Up{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default LoginForm;
