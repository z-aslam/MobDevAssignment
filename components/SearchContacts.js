/* eslint-disable camelcase */
import React, { Component } from "react";
import { TextInput, View, TouchableOpacity, Text } from "react-native";
import globalStyle from "../styles/globalStyle";
import { UserContext } from "../UserContext";
import ContactCard from "./ContactCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colours } from "../styles/colours";

class SearchContacts extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      page: 0,
      totalPages: 0,
      maxContacts: 4,
      text: "",
    };
  }
  handlePageNext = () => {
    if (this.state.contacts.length > 3) {
      this.searchContact(this.state.text, this.state.page + 1);
      this.setState({ page: this.state.page + 1 });
    }
  };
  handlePagePrevious = () => {
    if (this.state.page > 0) {
      this.searchContact(this.state.text, this.state.page - 1);
      this.setState({ page: this.state.page - 1 });
    }
  };

  searchContact = (text, page) => {
    console.log(text);
    if (text === "") {
      this.setState({ contacts: [] });
    } else {
      fetch(
        "http://localhost:3333/api/1.0.0/search?" +
          new URLSearchParams({
            q: text,
            limit: this.state.maxContacts,
            offset: page * this.state.maxContacts,
          }),
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-Authorization": this.context.UserData.sessionToken,
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.setState({ contacts: data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <View style={globalStyle.pageContainer}>
        <View
          style={{ width: "100%", flexDirection: "row", alignItems: "center" }}
        >
          <TextInput
            style={[globalStyle.searchBar, { flex: 9, marginTop: 10 }]}
            placeholder="Search Contacts..."
            onChangeText={(text) => {
              this.setState({ text: text, page: 0 });
              this.searchContact(text);
            }}
          />
        </View>

        <View
          style={{
            width: "100%",
            marginTop: 10,
            flex: 10,
          }}
        >
          {this.state.contacts.map(
            ({ email, family_name, given_name, user_id }) => (
              <ContactCard
                show={true}
                email={email}
                family_name={family_name}
                given_name={given_name}
                user_id={user_id}
                key={user_id}
              />
            )
          )}
        </View>
        <View style={{ flex: 1, width: "100%", flexDirection: "row", gap: 10 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              width: "100%",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
            onPress={() => {
              this.handlePagePrevious();
            }}
          >
            <Ionicons
              name="chevron-back-outline"
              size={30}
              color={this.state.page > 0 ? colours.black : colours.lighterGrey}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 25,
              }}
            >
              {this.state.page}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.handlePageNext();
            }}
            style={{
              flex: 1,
              width: "100%",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Ionicons
              name="chevron-forward-outline"
              size={30}
              color={
                this.state.contacts.length > 3
                  ? colours.black
                  : colours.lighterGrey
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default SearchContacts;
