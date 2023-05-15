import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { UserContext } from "../UserContext";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import globalStyle from "../styles/globalStyle";
import MessageBubble from "./MessageBubble";
import ContactCard from "./ContactCard";
import { useToast } from "react-native-toast-notifications";

const ContextChatCard = (props) => {
  const toast = useToast();
  return <ChatCard toast={toast} {...props} />;
};

class ChatCard extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      chatOpened: false,
      messages: [],
      messageText: "",
      addContact: false,
      contacts: [],
      members: [],
      titleText: this.props.name,
    };
  }

  handleMessageSend = (text) => {
    fetch(
      `http://localhost:3333/api/1.0.0/chat/${this.props.chat_id}/message`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-Authorization": this.context.UserData.sessionToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      }
    )
      .then((response) => {
        switch (response.status) {
          case 200:
            this.getMessages();
            break;
          case 400:
            this.props.toast.show("Bad Request", {
              type: "danger",
              placement: "top",
              duration: 2000,
            });
            break;
          case 401:
            this.props.toast.show("Unauthorized", {
              type: "danger",
              placement: "top",
              duration: 2000,
            });
            break;
          case 403:
            this.props.toast.show("Forbidden", {
              type: "danger",
              placement: "top",
              duration: 2000,
            });
            break;
          case 404:
            this.props.toast.show("Not Found", {
              type: "danger",
              placement: "top",
              duration: 2000,
            });
            break;
          case 500:
            this.props.toast.show("Server error", {
              type: "danger",
              placement: "top",
              duration: 2000,
            });
            break;
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  getContacts = () => {
    fetch("http://localhost:3333/api/1.0.0/contacts", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-Authorization": this.context.UserData.sessionToken,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            return response.json();
          case 400:
            this.props.toast.show("Bad Request", {
              type: "danger",
            });
            break;
          case 401:
            this.props.toast.show("Unauthorized", {
              type: "danger",
            });
            break;
          case 403:
            this.props.toast.show("Forbidden", {
              type: "danger",
            });
            break;
          case 404:
            this.props.toast.show("Not Found", {
              type: "danger",
            });
            break;
          case 500:
            this.props.toast.show("Server error", {
              type: "danger",
            });
            break;
        }
      })
      .then((json) => {
        console.log(json);
        this.setState({ contacts: json });
      })

      .catch((error) => {
        console.log(error);
      });
  };

  getMessages = () => {
    fetch(`http://localhost:3333/api/1.0.0/chat/${this.props.chat_id}`, {
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
        this.setState({ members: data.members });
        this.setState({ messages: data.messages });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleEdit = () => {
    fetch(`http://localhost:3333/api/1.0.0/chat/${this.props.chat_id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "X-Authorization": this.context.UserData.sessionToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.titleText,
      }),
    }).then((response) => {
      switch (response.status) {
        case 200:
          this.props.toast.show("Chat title edited", {
            type: "success",
          });
          break;
        case 401:
          this.props.toast.show("Unauthorized", {
            type: "danger",
          });
          break;
        case 404:
          this.props.toast.show("Not found", {
            type: "danger",
          });
        case 500:
          this.props.toast.show("Server error", {
            type: "danger",
          });
          break;
      }
    });
  };
  componentDidMount() {
    this.getMessages();
    this.getContacts();
    {
      setInterval(() => {
        this.getMessages();
      }, 1000);
    }
  }
  render() {
    return (
      <View
        style={[
          style.container,
          {
            backgroundColor: this.context.colour.white,
            color: this.context.colour.black,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            gap: 10,
            color: this.context.colour.black,
          }}
        >
          <TouchableOpacity
            style={{
              width: 45,
              height: 45,
              borderRadius: 45,
              margin: 5,
              flex: 2,
            }}
            onPress={() => {
              this.setState({ chatOpened: !this.state.chatOpened });
            }}
          >
            <Ionicons
              name="chatbubbles-outline"
              size={40}
              color={this.context.colour.green}
            />
          </TouchableOpacity>
          <View style={{ width: "70%", marginVertical: 10, gap: 5, flex: 8 }}>
            <TextInput
              style={{
                fontWeight: "bold",
                fontSize: 17,
                color: this.context.colour.black,
              }}
              defaultValue={this.props.name}
              onChangeText={(v) => {
                this.setState({ titleText: v });
              }}
              onSubmitEditing={this.handleEdit}
            />

            <Text
              style={{
                fontSize: 15,
                fontStyle: "italic",
                color: this.context.colour.black,
              }}
            >
              {this.state.members.length < 4
                ? this.state.members.map((text) => {
                    return this.state.members.indexOf(text) <
                      this.state.members.length - 1
                      ? text.first_name + ", "
                      : text.first_name;
                  })
                : this.state.members.length + " Members"}
            </Text>
          </View>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              this.setState({ chatOpened: !this.state.chatOpened });
            }}
          >
            <Ionicons
              color={this.context.colour.black}
              name={
                this.state.chatOpened
                  ? "caret-up-outline"
                  : "caret-down-outline"
              }
              size={18}
            />
          </TouchableOpacity>
        </View>

        {this.state.chatOpened && (
          <View
            style={{
              minHeight: 100,
              width: "100%",
              padding: 5,
              justifyContent: "flex-end",
            }}
          >
            {!this.state.addContact ? (
              <FlatList
                data={this.state.messages}
                style={{ width: "100%", marginVertical: 20, maxHeight: 250 }}
                inverted={-1}
                renderItem={({ item }) => {
                  if (item.message_id) {
                    const date = new Date(item.timestamp);
                    let hours = date.getHours();
                    hours = hours < 10 ? "0" + hours : hours;
                    let minutes = date.getMinutes();
                    minutes = minutes < 10 ? "0" + minutes : minutes;
                    let seconds = date.getSeconds();
                    seconds = seconds < 10 ? "0" + seconds : seconds;

                    return (
                      <MessageBubble
                        toast={this.props.toast}
                        chat_id={this.props.chat_id}
                        author={item.author.first_name}
                        message={item.message}
                        message_id={item.message_id}
                        timestamp={hours + ":" + minutes + ":" + seconds}
                        user_id={item.author.user_id}
                        key={item.message_id}
                      />
                    );
                  }
                }}
              />
            ) : (
              <FlatList
                data={this.state.contacts}
                style={{ width: "100%", marginVertical: 20, maxHeight: 250 }}
                renderItem={({ item }) => {
                  if (item.user_id != this.props.creator_id) {
                    return (
                      <ContactCard
                        show={true}
                        email={item.email}
                        family_name={item.last_name}
                        given_name={item.first_name}
                        user_id={item.user_id}
                        key={item.user_id}
                        chat_id={this.props.chat_id}
                        inChat={containsObject(
                          item.user_id,
                          this.state.members
                        )}
                      />
                    );
                  }
                }}
              />
            )}

            <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
              <TextInput
                style={[
                  globalStyle.searchBar,
                  {
                    flex: 9,
                    backgroundColor: this.context.colour.white,
                    color: this.context.colour.lighterGrey,
                  },
                ]}
                placeholder="Enter Message..."
                onChangeText={(text) => {
                  this.setState({ messageText: text });
                }}
              />
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  this.handleMessageSend(this.state.messageText);
                }}
              >
                <Ionicons
                  color={this.context.colour.black}
                  name="checkmark-outline"
                  size={30}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  if (this.state.addContact) {
                    this.getMessages();
                  } else {
                    this.getContacts();
                  }

                  this.setState({ addContact: !this.state.addContact });
                }}
              >
                <Ionicons
                  color={this.context.colour.black}
                  name={
                    !this.state.addContact
                      ? "people-circle-outline"
                      : "close-circle-outline"
                  }
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}
const containsObject = (userID, list) => {
  let i;
  for (i = 0; i < list.length; i++) {
    if (list[i].user_id === userID) {
      return true;
    }
  }

  return false;
};

const style = StyleSheet.create({
  container: {
    width: "100%",
    padding: 5,
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
    flexDirection: "column",
    alignItems: "center",
  },
});

export default ContextChatCard;
