
import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
//import { useNavigation } from '@react-navigation/native';
import styles from "../styles/globalStyle";

class Chats extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Chats</Text>
      </View>
    );
  }
}

export default Chats