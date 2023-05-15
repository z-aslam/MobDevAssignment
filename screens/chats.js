import React, { Component } from "react";
import { View } from "react-native";
import styles from "../styles/globalStyle";
import ChatForm from "../components/ChatForm";
import { UserContext } from "../UserContext";

class Chats extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: this.context.colour.offWhite },
        ]}
      >
        <ChatForm />
      </View>
    );
  }
}

export default Chats;
