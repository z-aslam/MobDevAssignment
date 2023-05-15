import React, { Component } from "react";
import { View } from "react-native";
import styles from "../styles/globalStyle";
import DisplayContacts from "../components/DisplayContacts";
import { UserContext } from "../UserContext";

class Contacts extends Component {
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
        <DisplayContacts navigation={this.props.navigation} />
      </View>
    );
  }
}

export default Contacts;
