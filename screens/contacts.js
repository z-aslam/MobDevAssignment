import React, { Component } from "react";
import { View } from "react-native";
import styles from "../styles/globalStyle";
import DisplayContacts from "../components/DisplayContacts";
import { colours } from "../styles/colours";

class Contacts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: colours.offWhite }]}>
        <DisplayContacts navigation={this.props.navigation} />
      </View>
    );
  }
}

export default Contacts;
