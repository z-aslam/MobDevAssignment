import React, { Component } from "react";
import { View } from "react-native";
import styles from "../styles/globalStyle";
import DisplayContacts from "../components/DisplayContacts";

class Contacts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <DisplayContacts navigation={this.props.navigation} />
      </View>
    );
  }
}

export default Contacts;
