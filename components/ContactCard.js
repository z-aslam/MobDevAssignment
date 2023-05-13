import React, { Component, useContext, useState } from "react";
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
import { useToast } from "react-native-toast-notifications";

const ContextContactCard = (props) => {
  const toast = useToast();
  return <ContactCard toast={toast} {...props} />;
};

class ContactCard extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      contactAdded: false,
      errorText: "",
      imageURI: "",
      contactAddedToChat: this.props.inChat,
      contactBlocked: this.props.contactBlocked
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

    fetch(`http://localhost:3333/api/1.0.0/user/${this.props.user_id}/photo`, {
      method: "GET",
      headers: {
        Accept: "image/png",
        "X-Authorization": this.context.UserData.sessionToken,
        "Content-Type": "image/png",
      },
    })
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
    if (!this.props.chat_id) {
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
              this.props.toast.show("Contact Added", {
                type: "success"
              });
              break;
            case 400:
              this.props.toast.show("You cannot add yourself as a contact", {
                type: "warning"
              });
              break;
            case 401:
              this.props.toast.show("Unauthorized", {
                type: "danger"
              });
              break;
            case 404:
              this.props.toast.show("User not found - Server error", {
                type: "danger"
              });
            case 500:
              this.props.toast.show("Server error", {
                type: "danger"
              });
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
              this.props.toast.show("Contact Removed", {
                type: "success"
              });
              break;
            case 400:
              this.props.toast.show("You cannot remove yourself as a contact", {
                type: "warning"
              });
              break;
            case 401:
              this.props.toast.show("Unauthorized", {
                type: "danger"
              });
              break;
            case 404:
              this.props.toast.show("User not found - Server error", {
                type: "danger"
              });
            case 500:
              this.props.toast.show("Server error", {
                type: "danger"
              });
              break;
          }
        });
      }
    } else {
      if (!this.state.contactAddedToChat) {
        fetch(
          `http://localhost:3333/api/1.0.0/chat/${this.props.chat_id}/user/${this.props.user_id}`,
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
              this.setState({ contactAddedToChat: true });
              this.props.toast.show("Contact added to chat", {
                type: "success"
              });
              break;
            case 400:
              this.props.toast.show("Bad Request", {
                type: "danger"
              });
              break;
            case 401:
              this.props.toast.show("Unauthorized", {
                type: "danger"
              });
              break;
            case 403:
              this.props.toast.show("Forbidden", {
                type: "danger"
              });
              break;
            case 404:
              this.props.toast.show("Not Found", {
                type: "danger"
              });
              break;
            case 500:
              this.props.toast.show("Server error", {
                type: "danger"
              });
              break;
          }
        });
      } else {
        fetch(
          `http://localhost:3333/api/1.0.0/chat/${this.props.chat_id}/user/${this.props.user_id}`,
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
              this.setState({ contactAddedToChat: false });
              this.props.toast.show("Contact removed from chat", {
                type: "success"
              });
              break;
            case 400:
              this.props.toast.show("Bad Request", {
                type: "danger"
              });
              break;
            case 401:
              this.props.toast.show("Unauthorized", {
                type: "danger"
              });
              break;
            case 403:
              this.props.toast.show("Forbidden", {
                type: "danger"
              });
              break;
            case 404:
              this.props.toast.show("Not Found", {
                type: "danger"
              });
              break;
            case 500:
              this.props.toast.show("Server error", {
                type: "danger"
              });
              break;
          }
        });
      }
    }
  };

  handleBlock = () => {
    if(!this.state.contactBlocked){
    fetch(
      `http://localhost:3333/api/1.0.0/user/${this.props.user_id}/block`,
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
          this.setState({ contactAdded: false, contactBlocked: true });
          this.props.toast.show("Contact Blocked", {
            type: "success"
          });
          break;
        case 400:
          this.props.toast.show("You cannot block yourself", {
            type: "warning"
          });
          break;
        case 401:
          this.props.toast.show("Unauthorized", {
            type: "danger"
          });
          break;
        case 404:
          this.props.toast.show("User not found - Server error", {
            type: "danger"
          });
        case 500:
          this.props.toast.show("Server error", {
            type: "danger"
          });
          break;
      }
    });
  }else{
    fetch(
      `http://localhost:3333/api/1.0.0/user/${this.props.user_id}/block`,
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
          this.setState({ contactAdded: false, contactBlocked: false });
          this.props.toast.show("Contact UnBlocked", {
            type: "success"
          });
          break;
        case 400:
          this.props.toast.show("You cannot unblock yourself", {
            type: "warning"
          });
          break;
        case 401:
          this.props.toast.show("Unauthorized", {
            type: "danger"
          });
          break;
        case 404:
          this.props.toast.show("User not found - Server error", {
            type: "danger"
          });
        case 500:
          this.props.toast.show("Server error", {
            type: "danger"
          });
          break;
      }
    });
  }
  }
  render() {
    return (
      <View style={style.container}>
        <View
          style={{
            width: 45,
            height: 45,
            borderRadius: 45,
            margin: 5,
          }}
        >
          <Image
            source={{
              uri: this.state.imageURI,
            }}
            style={{
              height: 45,
              width: 45,
              borderRadius: 45,
            }}
          />
        </View>
        <View style={style.subContainer}>
          <View style={{ flexDirection: "column", flex: 10 }}>
            <Text style={[style.title, style.textGeneral]}>
              {this.props.given_name + " " + this.props.family_name}
            </Text>
            <Text style={[style.email, style.textGeneral]}>
              {this.props.email}
            </Text>
          </View>
          <TouchableOpacity style={style.button} onPress={this.handleAdd}>
            {!this.props.chat_id ? (
              this.state.contactAdded ? (
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
              )
            ) : !this.state.contactAddedToChat ? (
              <Ionicons
                name="add-circle-outline"
                color={colours.black}
                size={24}
              />
            ) : (
              <Ionicons
                name="close-circle-outline"
                color={colours.black}
                size={24}
              />
            )}
          </TouchableOpacity>
          {!this.props.chat_id && (<TouchableOpacity onPress={this.handleBlock}>
            {!this.state.contactBlocked ? (<Ionicons name = 'eye-off-outline' color = {colours.black} size={24}/>) : (<Ionicons name = 'eye-outline' color = {colours.black} size={24}/>) }
          </TouchableOpacity>)}
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
    marginLeft: 10,
    width: "75%",
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
    margin: 20,
    flex: 2,
  },
  buttonText: {
    width: "100%",
    textAlign: "right",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default ContextContactCard;
