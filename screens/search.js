import React, { Component } from "react";
import { View } from "react-native";
import SearchContacts from "../components/SearchContacts";
import styles from "../styles/globalStyle";
import { UserContext } from "../UserContext";

class Search extends Component {
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
        <SearchContacts navigation={this.props.navigation} />
      </View>
    );
  }
}

export default Search;
