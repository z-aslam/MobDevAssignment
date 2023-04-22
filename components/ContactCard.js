import React, { Component, useState } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { UserContext } from "../UserContext";
import { StyleSheet } from "react-native";
import { colours } from "../styles/colours";
import Ionicons from "@expo/vector-icons/Ionicons";

class ContactCard extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      contactAdded: false,
      errorText: "",
    };
  }

  componentDidMount() {
    fetch("http://localhost:3333/api/1.0.0/contacts", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-Authorization": this.context.UserData.sessionToken,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(this.props.user_id);
        console.log(containsObject(this.props.user_id, data));
        if (containsObject(this.props.user_id, data)) {
          this.setState({ contactAdded: true });
        } else {
          this.setState({ contactAdded: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleAdd = () => {
    if (!this.state.contactAdded) {
      fetch(
        `http://localhost:3333/api/1.0.0/user/${this.props.user_id}/contact`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "X-Authorization": this.context.UserData.sessionToken,
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        console.log(response);
        switch (response.status) {
          case 200:
            this.setState({ contactAdded: true });
            break;
          case 400:
            this.setState({ errorText: "You can't add yourself as a contact" });
            break;
          case 401:
            this.setState({ errorText: "Unauthorized" });
            break;
          case 404:
            this.setState({ errorText: "User not found - server error" });
          case 500:
            this.setState({ errorText: "Server error" });
            break;
        }
      });
    }
  };
  render() {
    return (
      <View style={style.container}>
        <Text style={[style.title, style.textGeneral]}>
          {this.props.given_name + " " + this.props.family_name}
        </Text>
        <Text style={[style.email, style.textGeneral]}>
          {" "}
          {this.props.email}
        </Text>
        <TouchableOpacity style={style.button} onPress={this.handleAdd}>
          {this.state.contactAdded ? (
            <Ionicons
              name="person-remove-outline"
              color={colours.white}
              size={24}
            />
          ) : (
            <Ionicons name="person-add-outline" color={colours.white} size={24} />
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

const containsObject = (user_id, list) => {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i].user_id === user_id) {
      return true;
    }
  }

  return false;
};

const style = StyleSheet.create({
  container: {
    backgroundColor: colours.green,
    width: "100%",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginVertical: 10,
    elevation: 5,
    gap: 10,
  },
  textGeneral: {
    color: colours.white,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    fontSize: 15,
    fontStyle: "italic",
  },
  button: {
    width: "100%",
    textAlign: "right",
  },
  buttonText: {
    width: "100%",
    textAlign: "right",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default ContactCard;
