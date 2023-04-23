import React, { Component, useState } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { UserContext } from "../UserContext";
import { StyleSheet } from "react-native";
import { colours } from "../styles/colours";
import Ionicons from "@expo/vector-icons/Ionicons";
import globalStyle from "../styles/globalStyle";
import MessageBubble from "./MessageBubble";

class ChatCard extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      chatOpened: true,
      messages: [],
      messageText: ''
    };
  }

  handleMessageSend = (text) => {
    fetch(`http://localhost:3333/api/1.0.0/chat/${this.props.chat_id}/message`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "X-Authorization": this.context.UserData.sessionToken,
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        message: text
      })
    }).then(response => {
      switch (response.status){
        case 200:
          this.getMessages()
          break;
        case 400:
          throw 'bad request'
        case 401:
          throw 'unauthorized'
        case 403:
          throw 'forbidden'
        case 404:
          throw 'Not Found'
        case 500:
          throw 'server error'
      }
    }).catch(err => {
      throw err
    })
  };

  getMessages = () =>{
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
        this.setState({ messages: data.messages });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getMessages()
  }
  render() {
    return (
      <View style={style.container}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            gap: 10,
          }}
          onPress={() => {
            this.setState({ chatOpened: !this.state.chatOpened });
          }}
        >
          <View
            style={{
              backgroundColor: "blue",
              width: 45,
              height: 45,
              borderRadius: 45,
              margin: 5,
            }}
          ></View>
          <View style={{ width: "70%", marginVertical: 10, gap: 5 }}>
            <Text style={{ fontWeight: "bold", fontSize: 17 }}>
              {this.props.name}
            </Text>
            <Text style={{ fontSize: 15, fontStyle: "italic" }}>
              {this.props.first_name}
            </Text>
          </View>
          <View>
            <Ionicons
              name={
                this.state.chatOpened
                  ? "caret-up-outline"
                  : "caret-down-outline"
              }
              size={15}
            />
          </View>
        </TouchableOpacity>
        {this.state.chatOpened && (
          <ScrollView style={{maxHeight: 400,width:'100%'}} >
          <View
            style={{
              minHeight: 100,
              width: "100%",
              padding: 5,
              justifyContent: "flex-end",
            }}
          >
            <View style={{ width: "100%", marginVertical: 20 }}>
              {this.state.messages.map((message) => {
                if (message.message_id) {
                  let date = new Date(message.timestamp)
                  let hours = date.getHours();
                  let minutes = date.getMinutes();
                  let seconds = date.getSeconds();
                  return (
                    <MessageBubble
                      author={message.author.first_name}
                      message={message.message}
                      timestamp={hours + ':' + minutes + ':' + seconds}
                      user_id= {message.author.user_id}
                      key = {message.message_id}
                    />
                  );
                }
              })}
            </View>

            <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
              <TextInput
                style={[globalStyle.searchBar, { flex: 9 }]}
                placeholder="Enter Message..."
                onChangeText={(text) => {
                  this.setState({messageText: text})
                }}
              />
              <TouchableOpacity style={{ flex: 1 }} onPress={()=>{this.handleMessageSend(this.state.messageText);}}>
                <Ionicons name="checkmark-outline" size={30} />
              </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    backgroundColor: colours.white,
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

export default ChatCard;
