import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import styles from "../styles/globalStyle";
import BigLogo from "../components/BigLogo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../UserContext";
import ChatCard from "./ChatCard";
import globalStyle from "../styles/globalStyle";
import Ionicons from "@expo/vector-icons/Ionicons";

class ChatForm extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      chats: [],
      chatText: ''
    };
  }

  getChats = () => {
    fetch(`http://localhost:3333/api/1.0.0/chat`, {
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
          this.setState({ chats: data });
        })
        .catch((err) => {
          console.log(err);
        });
  }

  componentDidMount() {
    this.getChats()
  }

  handleChatCreate = () =>{
    fetch(`http://localhost:3333/api/1.0.0/chat`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-Authorization": this.context.UserData.sessionToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: this.state.chatText
        })
      }).then(response=>{
        this.getChats()
        switch (response.status) {
            case 201:
                this.getChats()
              break;
            case 400:
              throw "bad request";
            case 401:
              throw "unauthorized";
            case 500:
              throw "server error";
          }
      }).catch(err=>{
        throw err
      })
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        <Text
          style={{
            width: "90%",
            textAlign: "left",
            fontSize: 30,
            fontWeight: "bold",
            flex: 1
          }}
        >
          Your Chats
        </Text>
        <ScrollView style={{width:'100%', marginVertical:10,  flex: 10}}>
          {this.state.chats.map((chat) => {
            if (chat.creator) {
              return (
                <ChatCard
                  key={chat.chat_id}
                  creator_id={chat.creator.user_id}
                  creator_name={chat.creator.first_name}
                  name={chat.name}
                  chat_id={chat.chat_id}
                />
              );
            }
          })}
        </ScrollView>
        <View style={{flex: 1, width:'100%', flexDirection:'row', alignItems:'center'}}>
        <TextInput
                style={[globalStyle.searchBar, { flex: 9 }]}
                placeholder="Create Chat... "

                onChangeText={(text) => {
                  this.setState({
                    chatText: text
                  })
                }}
              />
            <TouchableOpacity style={{flex: 1, marginLeft: 10,  flexDirection:'row',alignContent: 'center'}} onPress={()=>{
                this.handleChatCreate()
            }}>
                <Ionicons name ='add-circle-outline' size={35}/>
            </TouchableOpacity>
        </View>
        <View/>
      </View>
    );
  }
}

export default ChatForm;
