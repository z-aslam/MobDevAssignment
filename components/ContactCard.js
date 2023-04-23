import React, { Component, useState } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  Alert,
  TouchableOpacity,
  Image,
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
      imageURI: ''
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
        if (containsObject(this.props.user_id, data)) {
          this.setState({ contactAdded: true });
        } else {
          this.setState({ contactAdded: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });

      fetch(
        `http://localhost:3333/api/1.0.0/user/${this.props.user_id}/photo`,
        {
          method: "GET",
          headers: {
            Accept: "image/png",
            "X-Authorization": this.context.UserData.sessionToken,
            "Content-Type": "image/png",
          },
        }
      )
        .then((response) => {
          return response.blob();
        })
        .then((imageRAW) => {
          const reader = new FileReader();
          reader.onload = () => {
            const base64data = reader.result;
            this.setState({ imageURI: base64data });
          };
          reader.readAsDataURL(imageRAW);
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
    } else {
      fetch(
        `http://localhost:3333/api/1.0.0/user/${this.props.user_id}/contact`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "X-Authorization": this.context.UserData.sessionToken,
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        switch (response.status) {
          case 200:
            this.setState({ contactAdded: false });
            break;
          case 400:
            this.setState({
              errorText: "You can't remove yourself as a contact",
            });
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
        <View
          style={{
            width: 75,
            height: 75,
            borderRadius: 75,
            margin: 5
          }}
        >
          <Image
            source={{
              uri: this.state.imageURI,
            }}
            style={{
              height: 75,
              width: 75,
              borderRadius: 75,
            }}
          />

        </View>
        <View style={style.subContainer}>
          <View style={{ flexDirection: "column",width: '55%'}}>
            <Text style={[style.title, style.textGeneral]}>
              {this.props.given_name + " " + this.props.family_name}
            </Text>
            <Text style={[style.email, style.textGeneral]}>
              {this.props.email}
            </Text>
          </View>
          <TouchableOpacity style={style.button} onPress={this.handleAdd}>
            {this.state.contactAdded ? (
              <Ionicons
                name="person-remove-outline"
                color={colours.black}
                size={24}
              />
            ) : (
              <Ionicons
                name="person-add-outline"
                color={colours.black}
                size={24}
              />
            )}
          </TouchableOpacity>
        </View>
        
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
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft:10,
    width: '100%'
  },
  container: {
    backgroundColor: colours.white,
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
    flexDirection: "row",
  },
  textGeneral: {
    color: colours.black,
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
