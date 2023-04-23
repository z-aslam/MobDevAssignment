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
  FlatList,
} from "react-native";
import { UserContext } from "../UserContext";
import { StyleSheet } from "react-native";
import { colours } from "../styles/colours";
import Ionicons from "@expo/vector-icons/Ionicons";
import globalStyle from "../styles/globalStyle";
import MessageBubble from "./MessageBubble";
import ContactCard from "./ContactCard";

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
      members: []
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
            throw "bad request";
          case 401:
            throw "unauthorized";
          case 403:
            throw "forbidden";
          case 404:
            throw "Not Found";
          case 500:
            throw "server error";
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
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          throw "Unauthorised";
        } else {
          throw "Server error";
        }
      })
      .then((json) => {
        console.log(json)
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
        this.setState({members: data.members})
        this.setState({ messages: data.messages });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getMessages();
    this.getContacts();
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
              backgroundColor: colours.white,
              width: 45,
              height: 45,
              borderRadius: 45,
              margin: 5,
            }}
          >
            <Ionicons name="chatbubbles-outline" size={40} color={colours.green}/>
          </View>
          <View style={{ width: "70%", marginVertical: 10, gap: 5 }}>
            <Text style={{ fontWeight: "bold", fontSize: 17 }}>
              {this.props.name}
            </Text>
            <Text style={{ fontSize: 15, fontStyle: "italic" }}>
            { this.state.members.length < 4 ? (this.state.members.map((text)=>{return ((this.state.members.indexOf(text) < this.state.members.length - 1 ? (text.first_name + ', ') : (text.first_name)))})) : this.state.members.length + ' Members'}

            
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
          <View
            style={{
              minHeight: 100,
              width: "100%",
              padding: 5,
              justifyContent: "flex-end",
            }}
          >
            {!this.state.addContact ? (<FlatList
              data={this.state.messages}
              style={{ width: "100%", marginVertical: 20,maxHeight: 250 }}
              inverted={-1}
              renderItem={({item}) => {
                if (item.message_id) {
                  let date = new Date(item.timestamp);
                  let hours = date.getHours();
                  hours = hours < 10 ? '0' + hours : hours
                  let minutes = date.getMinutes();
                  minutes = minutes < 10 ? '0' + minutes : minutes
                  let seconds = date.getSeconds();
                  seconds = seconds < 10 ? '0' + seconds : seconds

                  return (
                    <MessageBubble
                      author={item.author.first_name}
                      message={item.message}
                      timestamp={hours + ":" + minutes + ":" + seconds}
                      user_id={item.author.user_id}
                      key={item.message_id}
                    />
                  );
                }
            }
              }
            />) : (
              <FlatList
                data={this.state.contacts}
                style={{ width: "100%", marginVertical: 20,maxHeight: 250 }}
                renderItem={({item})=>{
                  if(item.user_id != this.props.creator_id){
                    return( <ContactCard
                      email={item.email}
                      family_name={item.last_name}
                      given_name={item.first_name}
                      user_id={item.user_id}
                      key={item.user_id}
                      chat_id={this.props.chat_id}
                      inChat = {containsObject(item.user_id,this.state.members)}
                    />)
                  }}
                  }
                 
              />
            )}


            <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
              <TextInput
                style={[globalStyle.searchBar, { flex: 9 }]}
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
                <Ionicons name="checkmark-outline" size={30} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  
                  if(this.state.addContact) { 
                    this.getMessages()
                  }else{
                    this.getContacts()
                  }
                  
                  this.setState({addContact: !this.state.addContact})
                }}
              >
                <Ionicons name={!this.state.addContact ? "people-circle-outline" : "close-circle-outline"} size={30} />
              </TouchableOpacity>
            </View>
          </View>
        )}
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
