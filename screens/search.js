import React, { Component } from "react";
import { View } from "react-native";
import SearchContacts from "../components/SearchContacts";
import styles from "../styles/globalStyle";
import { colours } from "../styles/colours";

class Search extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: colours.offWhite }]}>
        <SearchContacts navigation={this.props.navigation} />
      </View>
    );
  }
}

export default Search;
