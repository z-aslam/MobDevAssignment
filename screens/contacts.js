
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
import DisplayContacts from '../components/DisplayContacts';
import AddContact from "../components/AddContact";

class Contacts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <DisplayContacts navigation = {this.props.navigation}/>
      </View>
    );
  }
}

export default Contacts
