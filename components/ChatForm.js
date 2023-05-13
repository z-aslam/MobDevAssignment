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
import ContextChatCard from "./ChatCard";
import globalStyle from "../styles/globalStyle";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useToast } from "react-native-toast-notifications"; 



const ChatForm = (props) => {
  const toast = useToast();
  return <ChatFormChild toast={toast} {...props} />;
};



class ChatFormChild extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      chats: [],
      chatText: "",
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
  };

  componentDidMount() {
    this.getChats();
  }

  handleChatCreate = () => {
    fetch(`http://localhost:3333/api/1.0.0/chat`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "X-Authorization": this.context.UserData.sessionToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.chatText,
      }),
    })
      .then((response) => {
        this.getChats();
        switch (response.status) {
          case 201:
            this.getChats();
            break;
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
      .catch((err) => {
        throw err;
      });
  };

  render() {
    return (
      <View style={styles.pageContainer}>
        <Text
          style={{
            width: "90%",
            textAlign: "left",
            fontSize: 30,
            fontWeight: "bold",
            flex: 1,
          }}
        >
          Your Chats
        </Text>
        <ScrollView style={{ width: "100%", marginVertical: 10, flex: 10 }}>
          {this.state.chats.map((chat) => {
            if (chat.creator) {
              return (
                <ContextChatCard
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
        <View
          style={{
            flex: 1,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            style={[globalStyle.searchBar, { flex: 9 }]}
            placeholder="Create Chat... "
            onChangeText={(text) => {
              this.setState({
                chatText: text,
              });
            }}
          />
          <TouchableOpacity
            style={{
              flex: 1,
              marginLeft: 10,
              flexDirection: "row",
              alignContent: "center",
            }}
            onPress={() => {
              this.handleChatCreate();
            }}
          >
            <Ionicons name="add-circle-outline" size={35} />
          </TouchableOpacity>
        </View>
        <View />
      </View>
    );
  }
}

export default ChatForm;
