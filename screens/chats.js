import React, { Component } from "react";
import { View } from "react-native";
import { colours } from "../styles/colours";

import styles from "../styles/globalStyle";
import ChatForm from "../components/ChatForm";

class Chats extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: colours.offWhite }]}>
        <ChatForm />
      </View>
    );
  }
}

export default Chats;
